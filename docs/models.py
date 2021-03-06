from django.db import models
from django.contrib.postgres.indexes import BrinIndex
import uuid
from django.conf import settings
from docs.helpers import upload_to_doc_directory


class DocList(models.Model):
    MAIN = 'MA'
    LIST = 'LI'
    TYPE = (
        (MAIN, 'Основной список'),
        (LIST, 'Пользовательский список'),
    )
    name = models.CharField(max_length=255)
    community = models.ForeignKey('communities.Community', related_name='community_doclist', on_delete=models.CASCADE, null=True, blank=True, verbose_name="Сообщество")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='creator_doclist', on_delete=models.CASCADE, verbose_name="Создатель")
    type = models.CharField(max_length=5, choices=TYPE, default=LIST, verbose_name="Тип листа")
    order = models.PositiveIntegerField(default=0)
    uuid = models.UUIDField(default=uuid.uuid4, verbose_name="uuid")
    is_deleted = models.BooleanField(verbose_name="Удален", default=False)
    is_public = models.BooleanField(default=True, verbose_name="Виден другим")

    users = models.ManyToManyField("users.User", blank=True, related_name='users_doclist')
    communities = models.ManyToManyField('communities.Community', blank=True, related_name='communities_doclist')

    def __str__(self):
        return self.name + " " + self.creator.get_full_name()

    def is_doc_in_list(self, doc_id):
        return self.doc_list.filter(pk=doc_id).values("pk").exists()

    def is_not_empty(self):
        return self.doc_list.filter(list=self).values("pk").exists()

    def get_my_docs(self):
        queryset = self.doc_list.only("pk")
        return queryset

    def get_docs(self):
        queryset = self.doc_list.exclude(type=Doc.PRIVATE)
        return queryset

    def get_users_ids(self):
        users = self.users.exclude(perm="DE").exclude(perm="BL").exclude(perm="PV").values("pk")
        return [i['pk'] for i in users]

    def get_communities_ids(self):
        communities = self.communities.exclude(perm="DE").exclude(perm="BL").values("pk")
        return [i['pk'] for i in communities]

    def is_user_can_add_list(self, user_id):
        if self.creator.pk != user_id and user_id not in self.get_users_ids():
            return True
        else:
            return False
    def is_user_can_delete_list(self, user_id):
        if self.creator.pk != user_id and user_id in self.get_users_ids():
            return True
        else:
            return False
    def is_community_can_add_list(self, community_id):
        if self.community.pk != community_id and community_id not in self.get_communities_ids():
            return True
        else:
            return False
    def is_community_can_delete_list(self, community_id):
        if self.community.pk != community_id and community_id in self.get_communities_ids():
            return True
        else:
            return False

    def list_30(self):
        queryset = self.doc_list.exclude(type=Doc.PRIVATE)[:30]
        return queryset
    def list_6(self):
        queryset = self.doc_list.exclude(type=Doc.PRIVATE)[:6]
        return queryset

    def count_docs(self):
        return self.doc_list.filter(is_deleted=False).values("pk").count()

    def is_main_list(self):
        return self.type == self.MAIN
    def is_user_list(self):
        return self.type == self.LIST

    class Meta:
        verbose_name = "список документов"
        verbose_name_plural = "списки документов"
        ordering = ['order']


class Doc(models.Model):
    PRIVATE = 'P'
    STUDY = 'S'
    BOOK = 'B'
    OTHER = 'O'
    TYPES = (
        (PRIVATE, 'Личный документ'),
        (STUDY, 'Учебный документ'),
        (BOOK, 'Книга'),
        (OTHER, 'Другой документ'),
    )
    title = models.CharField(max_length=200, verbose_name="Название")
    file = models.FileField(upload_to=upload_to_doc_directory, verbose_name="Документ")
    created = models.DateTimeField(auto_now_add=True, auto_now=False, verbose_name="Создан")
    list = models.ManyToManyField(DocList, related_name='doc_list', blank=True)
    type = models.CharField(choices=TYPES, default='P', max_length=2)
    is_deleted = models.BooleanField(default=False, verbose_name="Удалено")
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='doc_creator', null=False, blank=False, verbose_name="Создатель")
    is_community = models.BooleanField(default=False, verbose_name="Пренадлежит к сообществу")

    class Meta:
        ordering = ["-created"]
        verbose_name = "Документ"
        verbose_name_plural = "Документы"
        indexes = (BrinIndex(fields=['created']),)

    def get_lists_for_doc(self):
        return self.list.all()

    def get_mime_type(self):
        import magic
        mime = magic.from_file(self.file.path, mime=True)
        return mime
