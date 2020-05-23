#!/bin/bash

export ANSIBLE_HOST_KEY_CHECKING=False
. ./openrc.sh; ansible-playbook --ask-become-pass DeployAllApplications.yaml -i inventory/inventory.ini
