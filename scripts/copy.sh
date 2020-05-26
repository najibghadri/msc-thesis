mkdir $1
cd $1
scp -r najib@152.66.240.21:/home/najib/Carla_0.9.8/PythonAPI/examples/_out/*.jpg .
#ffmpeg -framerate 30 -pattern_type glob -i '*.jpg' -qscale 0 0_output.mp4
#vlc 0_output.mp4
# rsync --remove-source-files
