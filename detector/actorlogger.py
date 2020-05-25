import json
from easydict import EasyDict as edict

class Frame():
    def __init__(self, frame_id):
        self.data = edict()
        self.data.frame = frame_id
        self.data.actors = []
        self.data.waypoints = []

    # def waypoint(self, waypoint):
    #     obj = edict()
    #     obj.center = 
    #     obj.right = 
    #     obj.left =
    #     return obj

    def addActor(self, id, type_id, distance, relative_position):
        obj = edict()
        obj.id = id
        obj.type_id = type_id
        obj.distance = distance
        obj.relative_position = relative_position
        # obj.acceleration = vectorToObj(actor.get_acceleration())
        # obj.velocity = vectorToObj(actor.get_velocity())
        # obj.angular_velocity = vectorToObj(actor.get_angular_velocity())
        # obj.transform = {}
        # obj.transform.location = vectorToObj(actor.get_transform().location)
        # obj.transform.rotation = rotationToObj(actor.get_transform().rotation)
        self.data.actors.append(obj)
        return obj

class ActorLogger(object):
    def __init__(self, path):
        self.path = path
        self.frameList = []

    def save(self):
        with open(('%s/detected.json' % (self.path)), 'w+') as fp:
            json.dump(self.frameList, fp, indent=2)

    def addFrame(self, frame):
        self.frameList.append(frame.data)
