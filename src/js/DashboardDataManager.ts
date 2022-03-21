/**
 * DashboardDataManager: this class loads, caches, and filters CSV and XML datasets
 * for use by dashboard charts and maps. Loosely based on the VizWit system
 * (see http://vizwit.io/) but we don't have a Carto database so all of the data
 * is stored internally in this class.
 *
 * Each tabbed dashboard should instantiate this class once, and destroy it when the dashboard
 * is closed. Datasets can be big, we don't want them to stick around forever!
 *
 * Data queries will return -both- the full dataset AND a filtered dataset. That way
 * the filtered data can be visually layered on top of the full data.
 */

import { rollup } from 'd3-array'

import { DataTable, FileSystemConfig, Status } from '@/Globals'
import globalStore from '@/store'
import HTTPFileSystem from './HTTPFileSystem'

import DataFetcherWorker from '@/workers/DataFetcher.worker.ts?worker'
import RoadNetworkLoader from '@/workers/RoadNetworkLoader.worker.ts?worker'

interface configuration {
  dataset: string
  groupBy?: string
  value?: string
  usedCol?: string[]
  columns?: string[]
  ignoreColumns?: any[]
  skipFirstRow?: boolean
  useLastRow?: boolean
  x?: string
}

interface NetworkLinks {
  source: Float32Array
  dest: Float32Array
  linkIds: any[]
}

export default class DashboardDataManager {
  constructor(...args: string[]) {
    // hello
    this.root = args.length ? args[0] : ''
    this.subfolder = args.length ? args[1] : ''
    this.fileApi = this.getFileSystem(this.root)
  }

  public async getFilteredDataset(config: { dataset: string; groupBy?: string; value?: string }) {
    const rows = this.datasets[config.dataset].filteredRows
    if (!rows) return { filteredRows: null }

    // group the rows as needed
    let bars: any = {}

    if (config.value && config.groupBy) {
      const columnValues = config.value
      const columnGroups = config.groupBy
      bars = rollup(
        rows,
        v => v.reduce((a, b) => a + b[columnValues], 0),
        (d: any) => d[columnGroups] // group-by
      )
    } else {
      // TODO need to handle non-value, non-group here
    }
    const x = Array.from(bars.keys())
    const y = Array.from(bars.values())

    // filter the rows, too

    return { filteredRows: { x, y } }
  }

  /**
   *
   * @param config the configuration params from the YAML file. Must include dataset, and other optional parameters as needed by the viz
   * @returns object with {x,y} or {allRows[]}
   */
  public async getDataset(config: configuration) {
    try {
      // first, get the dataset
      if (!this.datasets[config.dataset]) {
        console.log('load:', config.dataset)

        // allRows immediately returns a Promise<>, which we wait on so that
        // multiple charts don't all try to fetch the dataset individually
        this.datasets[config.dataset] = {
          dataset: this.fetchDataset(config),
          activeFilters: {},
          filteredRows: null,
          filterListeners: new Set(),
        }
      }

      let myDataset = await this.datasets[config.dataset].dataset
      let columns = Object.keys(myDataset)

      let allRows = { ...myDataset }

      // remove ignored columns
      if (config.ignoreColumns) {
        config.ignoreColumns.forEach(column => {
          delete allRows[column]
        })
      }

      // if useLastRow, do that
      if (config.useLastRow) {
        Object.keys(allRows).forEach(colName => {
          const values = myDataset[colName].values
          allRows[colName] = values[values.length - 1]
        })
      }

      return { allRows }
    } catch (e) {
      // const message = '' + e
      return { allRows: {} }
    }
  }

  /**
   *
   * @param path Full path/filename to the network file
   * @returns network (format TBA)
   */
  public async getRoadNetwork(path: string) {
    // first, get the dataset
    if (!this.networks[path]) {
      console.log(111, 'load network:', path)

      // fetchNetwork immediately returns a Promise<>, which we wait on so that
      // multiple views don't all try to fetch the network individually
      this.networks[path] = this.fetchNetwork(path)
    } else {
    }

    let network = await this.networks[path]
    return network
  }

  // /**
  //  * Load simple dataset without grouping/filtering
  //  * @param allRows Each row
  //  * @returns TBD
  //  */
  // public loadSimple(config: configuration, allRows: any[]) {
  //   // Simple requires x and columns/usedCol
  //   if (!config.x || (!config.columns && !config.usedCol)) {
  //     throw Error('Config requires "x" and "columns" parameters')
  //   }

  //   var useOwnNames = false

  //   const x = [] as any[]

  //   for (var i = 0; i < allRows.length; i++) {
  //     if (i == 0 && config.skipFirstRow) {
  //     } else {
  //       x.push(allRows[i][config.x])
  //     }
  //   }

  //   const columns = config.columns || config.usedCol || []

  //   for (let i = 0; i < columns.length; i++) {
  //     const name = columns[i]
  //     let legendName = ''
  //     if (columns[i] !== 'undefined') {
  //       if (useOwnNames) {
  //         legendName = this.config.legendTitles[i]
  //       } else {
  //         legendName = name
  //       }
  //       const value = []
  //       for (var j = 0; j < this.dataRows.length; j++) {
  //         if (j == 0 && this.config.skipFirstRow) {
  //         } else {
  //           value.push(this.dataRows[j][name])
  //         }
  //       }
  //       this.data.push({
  //         x: x,
  //         y: value,
  //         name: legendName,
  //         type: 'bar',
  //         textinfo: 'label+percent',
  //         textposition: 'inside',
  //         automargin: true,
  //       })
  //     }
  //   }
  // }

  public setFilter(dataset: string, column: string, value: any) {
    console.log('Filtering dataset:', dataset)

    const allFilters = this.datasets[dataset].activeFilters
    if (allFilters[column] !== undefined && allFilters[column] === value) {
      delete allFilters[column]
    } else {
      allFilters[column] = value
    }
    this.datasets[dataset].activeFilters = allFilters

    this.updateFilters(dataset) // this is async
  }

  public addFilterListener(config: { dataset: string }, listener: any) {
    this.datasets[config.dataset].filterListeners.add(listener)
  }

  public removeFilterListener(config: { dataset: string }, listener: any) {
    try {
      if (this.datasets[config.dataset].filterListeners) {
        this.datasets[config.dataset].filterListeners.delete(listener)
      }
    } catch (e) {
      // doesn't matter
    }
  }

  public clearCache() {
    this.datasets = {}
  }

  // ---- PRIVATE STUFFS -----------------------

  private async updateFilters(datasetId: string) {
    const dataset = this.datasets[datasetId]

    if (!Object.keys(dataset.activeFilters).length) {
      dataset.filteredRows = null
    } else {
      const allRows = (await dataset.dataset).rows

      // TODO: fix this!
      // let filteredRows = allRows
      // for (const [column, value] of Object.entries(dataset.activeFilters)) {
      //   console.log('filtering:', column, value)
      //   filteredRows = filteredRows.filter(row => row[column] === value)
      // }
      // dataset.filteredRows = filteredRows
    }
    this.notifyListeners(datasetId)
  }

  private notifyListeners(datasetId: string) {
    const dataset = this.datasets[datasetId]
    for (const notifyListener of dataset.filterListeners) {
      notifyListener()
    }
  }

  // private thread!: any
  private files: any[] = []

  private async fetchDataset(config: { dataset: string }) {
    if (!this.files.length) {
      const { files } = await new HTTPFileSystem(this.fileApi).getDirectory(this.subfolder)
      this.files = files
    }

    return new Promise<DataTable>((resolve, reject) => {
      try {
        const thread = new DataFetcherWorker()
        thread.postMessage({
          fileSystemConfig: this.fileApi,
          subfolder: this.subfolder,
          files: this.files,
          config: config,
        })

        thread.onmessage = e => {
          if (e.data.error) {
            console.log(e.data.error)
            var msg = '' + e.data.error
            //globalStore.commit('error', e.data.error)
            globalStore.commit('setStatus', {
              type: Status.ERROR,
              msg: `File cannot be loaded.`,
              desc:
                'Please check if the file exists. It is this file: ' +
                this.subfolder +
                '/' +
                config.dataset,
            })
            reject()
          }
          resolve(e.data)
        }
      } catch (err) {
        console.error(err)
        reject(err)
      }
    })
  }

  private async fetchNetwork(path: string) {
    return new Promise<NetworkLinks>((resolve, reject) => {
      const thread = new RoadNetworkLoader()
      try {
        thread.postMessage({
          filePath: path,
          fileSystem: this.fileApi,
        })

        thread.onmessage = e => {
          thread.terminate()
          if (e.data.error) {
            console.error(e.data.error)
            globalStore.commit('error', e.data.error)
            reject()
          }
          resolve(e.data.links)
        }
      } catch (err) {
        thread.terminate()
        console.error(err)
        reject(err)
      }
    })
  }

  private getFileSystem(name: string) {
    const svnProject: FileSystemConfig[] = globalStore.state.svnProjects.filter(
      (a: FileSystemConfig) => a.slug === name
    )
    if (svnProject.length === 0) {
      console.error('DDM: no such project')
      throw Error
    }
    return svnProject[0]
  }

  private subfolder = ''
  private root = ''
  private fileApi: FileSystemConfig

  private datasets: {
    [id: string]: {
      dataset: Promise<DataTable>
      filteredRows: any[] | null
      activeFilters: { [column: string]: any }
      filterListeners: Set<any>
    }
  } = {}

  private networks: { [id: string]: Promise<NetworkLinks> } = {}
}
