#!/bin/bash
# run this in Rendering/{number}, black.jpg in Rendering folder

mkdir montage${2-}
for N in {0..4000}
do
	if [ -e ${1-out}/${N}F${2-L}.jpg ]
	then
		if [ -z ${start+x} ]
		then 
			declare -i start=$N
			echo start $start
		fi
		echo current $N
		convert -crop 50%x50% +repage  ${1-out}/${N}F${2-L}.jpg  ${1-out}/${N}F${2-L}.jpg
		convert -resize 50% ${1-out}/${N}LC${2-2}.jpg ${1-out}/${N}LC${2-2}halfed.jpg
		convert -resize 50% ${1-out}/${N}RC${2-1}.jpg ${1-out}/${N}RC${2-1}halfed.jpg 
		convert -resize 50% ${1-out}/${N}L${2-2}.jpg ${1-out}/${N}L${2-2}halfed.jpg 
		convert -resize 50% ${1-out}/${N}R${2-1}.jpg ${1-out}/${N}R${2-1}halfed.jpg

		montage -geometry +0+0 -tile 2x4 ${1-out}/${N}F${2-L}-0.jpg ${1-out}/${N}F${2-L}-1.jpg ${1-out}/${N}F${2-L}-2.jpg ${1-out}/${N}F${2-L}-3.jpg ${1-out}/${N}LC${2-2}halfed.jpg ${1-out}/${N}RC${2-1}halfed.jpg ${1-out}/${N}L${2-2}halfed.jpg ${1-out}/${N}R${2-1}halfed.jpg montage${2-}/${N}montage.jpg
	fi
done
echo start $start
ffmpeg -framerate 30 -start_number $start -i montage${2-}/%dmontage.jpg -qscale 0 output${2-}.mp4
ffmpeg -i output${2-}.mp4 -vcodec libx265 -crf 28 output${2-}_comp1.mp4
ffmpeg -i output${2-}_comp1.mp4 -vcodec libx265 -crf 30 output${2-}_comp2.mp4
ffmpeg -i output${2-}_comp2.mp4 -c:v libvpx-vp9 -crf 30 -b:v 1M -b:a 128k -c:a libopus output${2-}.webm
