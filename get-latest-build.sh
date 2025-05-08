#!/bin/bash
git fetch origin
git reset --hard origin/build  # this fetches the build branch exactly as found – no merging
sudo systemctl restart gunicorn
