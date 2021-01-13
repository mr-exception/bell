#!/bin/bash
curl https://get.okteto.com -sSfL | sh
okteto namespace mr-exception
okteto build -t registry.cloud.okteto.net/mr-exception/bell .