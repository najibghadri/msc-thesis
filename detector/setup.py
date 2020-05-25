# code below should either be used in jupyter notebook or in bash without "!" and python code

# conda create -n detectron python=3.6 # use this or just use the envirnoment.yml in the root folder to set up conda
# conda activate detectron

# then

# install dependencies: (use cu101 because colab has CUDA 10.1) -- 
# !pip install -U torch==1.5 torchvision==0.6 -f https://download.pytorch.org/whl/cu102/torch_stable.html # cu101 originally (cuda version nvcc --version)
# !pip install cython pyyaml==5.1
# !pip install -U 'git+https://github.com/cocodataset/cocoapi.git#subdirectory=PythonAPI'
# import torch, torchvision
# print(torch.__version__, torch.cuda.is_available())
# !gcc --version
# opencv is pre-installed on colab

# install detectron2:
# !pip install detectron2==0.1.3 -f https://dl.fbaipublicfiles.com/detectron2/wheels/cu102/index.html # cu101 originally

# pip install numpy
# pip install setuptools
# pip install --ignore-installed opencv-python

# for jupyter notebook when preinstalled add current conda env to kernels
# conda install -c anaconda ipykernel
# python -m ipykernel install --user --name=detectron

# good to go