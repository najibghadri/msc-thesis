import sys

import detectron2
from detectron2.utils.logger import setup_logger
setup_logger()

# import some common libraries
import numpy as np
import cv2
import random

from matplotlib import pyplot as plt

# import some common detectron2 utilities
from detectron2 import model_zoo
from detectron2.engine import DefaultPredictor
from detectron2.config import get_cfg
from detectron2.utils.visualizer import Visualizer
from detectron2.data import MetadataCatalog
from detectron2.data.datasets.builtin_meta import COCO_CATEGORIES

def cv2_imshow( im ):
    cv2.imshow('',im)
    cv2.waitKey(0)
    cv2.destroyAllWindows()

#sys.argv[1]

########### CONFIGURE DETECTRON
cfg = get_cfg()
# add project-specific config (e.g., TensorMask) here if you're not running a model in detectron2's core library
cfg.merge_from_file(model_zoo.get_config_file("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml"))
cfg.MODEL.ROI_HEADS.SCORE_THRESH_TEST = 0.5  # set threshold for this model
# Find a model from detectron2's model zoo. You can use the https://dl.fbaipublicfiles... url as well
cfg.MODEL.WEIGHTS = model_zoo.get_checkpoint_url("COCO-InstanceSegmentation/mask_rcnn_R_50_FPN_3x.yaml")
predictor = DefaultPredictor(cfg)

########### CONFIGURE STEREO MATCHER
num_disp = 128
window_size = 11
stereo = cv2.StereoSGBM_create(numDisparities = num_disp, blockSize = window_size )
stereo.setUniquenessRatio(5)


########### READ IMAGES
imgL = cv2.imread('/home/najib/Thesis/Rendering/1/out/527FL.jpg')
imgR = cv2.imread('/home/najib/Thesis/Rendering/1/out/527FR.jpg')


########### HIDE EGO CAR
imgR[630:720, 0:880] = [15,15,15]
imgL[630:720, 410:1280] = [0,0,0]
plt.figure(figsize=(20,10))
plt.imshow(imgL[:,:,::-1]) # bgr to rgb
#cv2_imshow(im)


########### COMPUTE STEREO
grayL = cv2.cvtColor(imgL, cv2.COLOR_BGR2GRAY)
grayR = cv2.cvtColor(imgR, cv2.COLOR_BGR2GRAY)
disp = stereo.compute(grayL, grayR).astype(np.float32) / 16.0
disp_map = (disp)/num_disp

plt.figure(figsize=(20,10))
plt.imshow(disp_map)
plt.show()
#cv2_imshow(disp_map)

########### PREDICT DETECTIONS
outputs = predictor(imgL)
# look at the outputs. See https://detectron2.readthedocs.io/tutorials/models.html#model-output-format for specification
outputs["instances"].pred_boxes 
outputs["instances"].pred_classes
print(outputs["instances"])

v = Visualizer(imgL[:, :, ::-1], MetadataCatalog.get(cfg.DATASETS.TRAIN[0]), scale=1.2)
v = v.draw_instance_predictions(outputs["instances"].to("cpu"))
detim = v.get_image()

plt.figure(figsize=(20,10))
plt.imshow(detim)
#cv2_imshow(detim[:, :, ::-1])