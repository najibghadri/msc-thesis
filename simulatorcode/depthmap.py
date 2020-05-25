#!/usr/bin/env python

'''
Simple example of stereo image matching and point cloud generation.
Resulting .ply file cam be easily viewed using MeshLab ( http://meshlab.sourceforge.net/ )
'''
import numpy as np
import cv2
from matplotlib import pyplot as plt

print(cv2)
print(cv2.__version__)

imgL = cv2.imread('/home/najib/Thesis/Rendering/1/out/00003865FL.jpg')
imgR = cv2.imread('/home/najib/Thesis/Rendering/1/out/00003865FR.jpg')


num_disp = 128
window_size = 11
stereo = cv2.StereoSGBM_create(numDisparities = num_disp, blockSize = window_size )
stereo.setUniquenessRatio(5)

grayL = cv2.cvtColor(imgL, cv2.COLOR_BGR2GRAY)
grayR = cv2.cvtColor(imgR, cv2.COLOR_BGR2GRAY)
disp = stereo.compute(grayL, grayR).astype(np.float32) / 16.0
disp_map = (disp)/num_disp

plt.figure(figsize=(20,10))
plt.imshow(disp_map,'gray')
plt.show()

# cv2_imshow(disparity)
