#!/bin/bash
# run this in Rendering/{number}, black.jpg in Rendering folder

mkdir montage${2-}
for N in {0..4000}
do
	if [ -e out/${N}FL${2-}.jpg ]
	then
		echo $N
		montage -geometry +0+0 -tile 3x2  ${1-out}/${N}LC2${2-}.jpg ${1-out}/${N}FL${2-}.jpg ${1-out}/${N}RC1${2-}.jpg ${1-out}/${N}L2${2-}.jpg ../black.jpg ${1-out}/${N}R1${2-}.jpg montage${2-}/${N}montage.jpg
	fi
done

ffmpeg -framerate 30 -pattern_type glob -i 'montage$'${2-}'/*.jpg' -qscale 0 output${2-}.mp4