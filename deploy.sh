#!/bin/bash
# curl https://get.okteto.com -sSfL | sh
okteto login --token=QdgToMzqRaOGoBUpzWK29vbAukBzx6haFPjueZv8
okteto namespace mr-exception
okteto build -t registry.cloud.okteto.net/mr-exception/bell .