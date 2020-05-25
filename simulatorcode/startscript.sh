#!/bin/bash
gnome-terminal -- /bin/sh -c 'DISPLAY= /home/najib/Thesis/CARLA_0.9.8/CarlaUE4.sh -opengl; bash'

sleep 3

if ! [[ "$*" == *'nosp'* ]]
then
    gnome-terminal -- /bin/sh -c 'cd /home/najib/Thesis/CARLA_0.9.8/PythonAPI/examples; python spawn_npc.py -n 150 -w 50; bash';
fi


sleep 3
gnome-terminal -- /bin/sh -c 'cd /home/najib/Thesis/CARLA_0.9.8/PythonAPI/examples; python manual_control.py; bash';

