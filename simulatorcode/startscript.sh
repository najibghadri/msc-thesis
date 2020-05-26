#!/bin/bash
gnome-terminal -- /bin/sh -c 'DISPLAY= /home/najib/Thesis/CARLA_0.9.8/CarlaUE4.sh -opengl; bash'

sleep 2
gnome-terminal -- /bin/sh -c 'cd /home/najib/Thesis/CARLA_0.9.8/PythonAPI/util; python config.py -m '${1-Town03}'; python config.py -i; bash';

sleep 4
gnome-terminal -- /bin/sh -c 'cd /home/najib/Thesis/CARLA_0.9.8/PythonAPI/examples; python manual_control.py; bash';


if ! [[ $2 == 'nosp' ]]
then
sleep 3
gnome-terminal -- /bin/sh -c 'cd /home/najib/Thesis/CARLA_0.9.8/PythonAPI/examples; python spawn_npc.py -n '${2-150}' -w '${3-50}'; bash';
fi
