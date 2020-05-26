# Budapest University of Technology and Economics
Faculty of Electrical Engineering and Informatics \
Department of Control Engineering and Information Technolog

Najib Ghadri's research in autonomous driving

Artifacts:
 - Code
 - Montage of some drives
 - Montage yolo detections
 - Montage depthmaps
 - Montage All
 - Measurements on my and cloud GPU
 - 3D webviz coupled with montage and data
 - Difference between ground truth and results
<br/>
<br/>
 - Thesis structure
  (before each section list parts)
  (highligh in bold the essential parts)
  (figures will be mentioned)
   - Abstract:
     - Subject placement, importance of topic
     - Related work for comapnies, recent news
     - Quick summary of what was done and why
     - How it turned out - read more exact on najibghadri.com/msc-thesis
   - Introduction
     - What is needed for perception to work (problem):
       - Localization, understanding the surrounding etc
       - Data set problem
       - The unkown problem (hint to energy based models and unsupervised learning)
       - broad - narrow problem
     - Short Proposed solution
       - Task flow (flow diagram): simulation, extraction, imaging, 
     - All code and thesis available at https://github.com/najibghadri/msc-thesis
     - Short summary of results: ...,  detector which uses: state of the art ...
     - Detector can be used like a plug in
     - Structure of Thesis
   - Kind of perceptions
     - Object Detection
     - Classification
     - Localization
     - Bounding boxes
     - Segmentation
     - Depth estimation
     - Orientation
     - 3D detection
     - Tracking
     - Vidar Stereo imaging
     - Road detection:
     - Lane detection
     - Driveable Road
     - Odometry
     - Lidaring
   - All related work
     - Datasets - KITTI, MARS, COCO, Waymo, nuScenes
     - (AlexNet, LeNet, VGG)
     - YOLO
     - R-CNN, Fast, Faster
     - Mask R-CNN
     - Detectron
     - PointNet
     - VoxelNet
     - Segmentation Networks
     - ...
   - Assumptions made to simplify the task
     - Later will talk about improvements
     - Plane assumption: The objects and road has ~0 pitch and ~0 roll (valid for most of the time)
     - Time is not important
     - Human pose does not matter
     - Day light situation

   - Design and implementation
     - Task flow again: simulation, extraction, imaging, 
     - The simulation idea for dataset and ground truth
     - Tools used
       - Linux Ubuntu
       - VS Code
       - Python, Scripts, Colab
       - No training
     - Stereo imaging
     - Simulation imaging: HD 720p, Camera matrix, compression, noise, reality, distortion, focus, etc, cropping, occlusion, etc, throughoutput
     - Two coordinate systems
     - Which of the algorithms described in the Related Work chapter we chose and why
     - What frameworks are available and how are they different and why we chose the one we chose
     - Depth estimation
       - Camera Calibration
       - Projective Camera Model
       - Stereo Block Matching Algorithm (newer)
     - Detector - the final solution
       - Peudo code - the algorithm
     - Detectron2
       - About
       - Why Instance segm
       - Comparisons
     - Web visualizer
       -  Framework
       -  Usage and results
   - Experimental results
     - Key point detection - orientation
     - 3D bounding box detection
     - YOLO
     - Dark results
     - Tracking
     - Lane detection
     - Orientation problematic results with ...
   - Results
     - Fine tuning:
       - Depth mean vs mode
       - FPS of one side vs all sides
         - All: FPS avg:  0.53 FPS TITAN X
           - If saving pictures: FPS avg:  0.29
         - One: 
         - Three: 
       - FPS of one side my computer vs Titan X
         - 
       - Different models and their accuracy and FPS one side
     - Explaining errors
     - Results I am proud of
     - precision, recall acc, danger
     - Dangerousness
     - Hardware requirements
   - Future improvements
     - Mono depth correction 
     - Less sensors: rectified cameras - exo stereo
     - Better scene understanding: road segmentation, path regression
     - The biggest improvements in my opinion are unsupervised learning energy based methods - for PHD
     - Energy based method - Yann LeCun
       - Latent space for possible outcomes
       - Traffic situation understanding
       - Surrounding understanding
     - Drivable area reconstruction from other actors
     - Orientation, keypoint detection, wheel, etc detection
     - Voxel reconstruction of actors
     - Car position, tilt, velocity detection and correction, odometric correction
     - Size based depth correction
     - Parallax motion based depth correction
     - Traffic light understanding
     - Foreign object detection - White list based - difficult problem! (https://link.springer.com/article/10.1186/s13640-018-0261-2)
     
     - Dark situations: solution: night detectors, different models

   - Conclusion good bye bye
     - My prediction: only an open commond ever-growing AI could qualify as a super driving AI

# Driving Scene Understanding with RGB cameras based on Stereo Imaging and trained Deep CNN synergy

The concept is the following: I use modern CNNs suchs as YOLOv4, Deep SORT, R-CNN or others to perform object detection, semantic segmentation, and additional
feature detections with classical methods to achieve lane detection such as Hough transform and perform distance estimation using stereo imaging.

For this project I decided that I will test my system on a simulation. This gives me great freedom and efficiency to focus on developing
the algorithms instead of worrying about the lack of good datasets, because as we know, generating a dataset is half of the hustle in ML today (yet). 
However in a simulation you can do anythis almost instantly if you put aside the rendering time. Put arbitrary number of cameras anywhere, use any car,
be on any kind of road, use camera effects, generate ground truth of any kind programatically (bounding boxes, segmentation, depth, steering data, location data).

After extensive research I stumbled upon [CARLA Simulator](http://carla.org/). The project is developed by the Barcelonian university UAB's computer vision CVC Lab. This simulator has a really good API that let's us do what I described above in python.

The following is the sensor architecture in my system; Only 10 90° FOV RGB cameras, Front stereo, left/right 45° angled corner stereos and left/right side stereos.
Here you can see how it looks like with one image for each side:

With the output combination of CNNs and other algorithms I will then perform ”self-supervised” deep-learning
with continuous energy-based method to learn the latent space of generic driving scene scenarios.


This is going to be the next part of my thesis that I am still working on.


![image](/latek/figures/carla.png)

![image](/latek/figures/3dmodel1.png)

![image](/latek/figures/3dmodel2.png)

![image](/latek/figures/3dmodel3.png)

![image](/latek/figures/335DP.jpg)

![image](/latek/figures/335DET.jpg)

![image](/latek/figures/335merged.jpg)


# Bibliography

[Yann LeCun: "Energy-Based Self-Supervised Learning"](https://www.youtube.com/watch?v=A7AnCvYDQrU&list=PL00LRaU8KFs46LT27W0SEMOW34j3N5-bJ&index=12&t=0s)

[CES 2020: An Hour with Amnon - Autonomous Vehicles Powered by Mobileye](https://www.youtube.com/watch?v=HPWGFzqd7pI&t=1817s)

[How the Mobileye Roadbook™ Enables L2+ Solutions](https://www.youtube.com/watch?v=Qmn5IF_nFTk&list=PL00LRaU8KFs46LT27W0SEMOW34j3N5-bJ&index=14&t=3s)

[Tesla Autonomy Day](https://www.youtube.com/watch?v=Ucp0TTmvqOE&list=PL00LRaU8KFs46LT27W0SEMOW34j3N5-bJ&index=14)

[Testing The World's Smartest Autonomous Car (NOT A Tesla)](https://www.youtube.com/watch?v=l3ELVACR2VY&list=PL00LRaU8KFs46LT27W0SEMOW34j3N5-bJ&index=5&t=0s)

### Simulators:

http://carla.org/

https://deepdrive.voyage.auto/

[Introducing Voyage Deepdrive](https://news.voyage.auto/introducing-voyage-deepdrive-69b3cf0f0be6)

[Parallel Domain Inc.](https://www.paralleldomain.com/)

[Applied Intuition, Inc](https://www.appliedintuition.com/)

https://www.cognata.com/

https://righthook.io/

https://www.foretellix.com/technology/

http://www.rfpro.com/

## AV and AD Software Development Companies

[AIMotive](https://aimotive.com/)

[Autonomous Intelligent Driving GmbH](https://aid-driving.eu/)

[Wayve](https://wayve.ai/)

[Mobileye](https://www.mobileye.com/)

[Waymo](https://waymo.com/)

[Ascent Robotics](https://ascent.ai/en/)

[Voyage](https://voyage.auto/careers/)

[Uber](https://eng.uber.com/atg-dataviz/)

[Tesla](https://www.tesla.com/en_eu)

[Aptiv](https://www.aptiv.com/)

[Cruise](https://www.getcruise.com/careers/)

[NVIDIA DRIVE](https://www.nvidia.com/en-us/self-driving-cars/drive-platform/)

## Autonomous Robotics Companies

[Covariant](https://covariant.ai/solutions)

[Ascent Robotics](https://ascent.ai/en/)

## Courses
https://selfdrivingcars.mit.edu/


# References