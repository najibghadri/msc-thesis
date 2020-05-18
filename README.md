# Budapest University of Technology and Economics
Faculty of Electrical Engineering and Informatics \
Department of Control Engineering and Information Technolog

Najib Ghadri's research in autonomous driving

# Driving Scene Understanding based on exsitsting Deep CNN combinations and stereo imaging

The concept is the following: I use modern CNNs suchs as YOLOv4, Deep SORT, R-CNN or others to perform object detection, semantic segmentation, and additional
feature detections with classical methods to achieve lane detection such as Hough transform and perform distance estimation using stereo imaging.

For this project I decided that I will test my system on a simulation. This gives me great freedom and efficiency to focus on developing
the algorithms instead of worrying about the lack of good datasets, because as we know, generating a dataset is half of the hustle in ML today (yet). 
However in a simulation you can do anythis almost instantly if you put aside the rendering time. Put arbitrary number of cameras anywhere, use any car,
be on any kind of road, use camera effects, generate ground truth of any kind programatically (bounding boxes, segmentation, depth, steering data, location data).

After extensive research I stumbled upon [CARLA Simulator](http://carla.org/). The project is developed by the Barcelonian university UAB's computer vision CVC Lab. This simulator has a really good API that let's us do what I described above in python.

The following is the sensor architecture in my system; Only 10 90° FOV RGB cameras, Front stereo, left/right 45° angled corner stereos and left/right side stereos.
Here you can see how it looks like with one image for each side:

  <video
    loop
    muted
    autoplay
    preload="auto"
    poster="/media/thesis/montage.jpg"
    >
    <source src="/media/thesis/montage2.webm" type="video/webm">
    <source src="/media/thesis/montage2.mp4" type="video/mp4">
  </video>

With the output combination of CNNs and other algorithms I will then perform ”self-supervised” deep-learning
with continuous energy-based method to learn the latent space of generic driving scene scenarios.


This is going to be the next part of my thesis that I am still working on.

# References

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

