from django.db import models
from django.db.models.signals import post_save
from django.contrib.auth.models import AbstractUser
from django.utils import timezone

class User(AbstractUser):
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    email_confirmed = models.BooleanField(default=False)
    confirmation_token = models.CharField(max_length=100, blank=True, null=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']


    def profile(self):
        profile = Profile.objects.get(user=self)

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=1000)
    bio = models.CharField(max_length=100)
    image = models.ImageField(upload_to="user_images", default="default.jpg")
    verified = models.BooleanField(default=False)

    def __str__(self):
        return self.full_name


def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)

def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()

post_save.connect(create_user_profile, sender=User)
post_save.connect(save_user_profile, sender=User)

class Group(models.Model):
    name = models.CharField(max_length=100)
    members = models.ManyToManyField(User)
    projects = models.ManyToManyField('Project', related_name='groups')
    def __str__(self):
        return self.name

    @classmethod
    def get_default_group_id(cls):
        default_group, _ = cls.objects.get_or_create(name="Default Group")
        return default_group.id
    



class Project(models.Model):
    project_name = models.CharField(max_length=100)
    start_date = models.DateField()
    due_date = models.DateField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    description = models.TextField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=Group.get_default_group_id)

    def __str__(self):
        return self.project_name

    def owner_username(self):
        return self.owner.username
    
class GroupNprojectAssoc(models.Model):
    group = models.ForeignKey(Group, on_delete=models.CASCADE, null=True, blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, null=True, blank=True)
    members = models.ManyToManyField(User)

   
    def project_username(self):
        return self.project.project_name
    

    


class Task(models.Model):
    task_name = models.CharField(max_length=100, default=None)
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE, default=None)
    start_date = models.DateField()
    due_date = models.DateField()
    assignee = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    description = models.TextField()
    group = models.ForeignKey(Group, on_delete=models.CASCADE, default=Group.get_default_group_id)  
    def __str__(self):
        return self.task_name
    
    def project_username(self):
        return self.project_name.project_name