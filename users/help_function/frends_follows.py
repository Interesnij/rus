   def confirm_connection_with_user_with_id(self, user_id):
        check_is_not_fully_connected_with_user_with_id(user=self, user_id=user_id)

        connection = self.update_connection_with_user_with_id(user_id, circles_ids=circles_ids)

        if not self.is_following_user_with_id(user_id):
            self.follow_user_with_id(user_id)

        return connection

def update_connection_with_user_with_id(self, user_id):
    check_is_connected_with_user_with_id(user=self, user_id=user_id)

    connection = self.get_connection_for_user_with_id(user_id)
    connection.save()
    return connection

def disconnect_from_user(self, user):
    return self.disconnect_from_user_with_id(user.pk)

def disconnect_from_user_with_id(self, user_id):
    check_is_connected_with_user_with_id(user=self, user_id=user_id)
    if self.is_fully_connected_with_user_with_id(user_id):
        if self.is_following_user_with_id(user_id):
            self.unfollow_user_with_id(user_id)

    connection = self.connections.get(target_connection__user_id=user_id)
    connection.delete()

    return connection

def search_followings_with_query(self, query):
    followings_query = Q(followers__user_id=self.pk, is_deleted=False)

    names_query = Q(username__icontains=query)
    names_query.add(Q(profile__name__icontains=query), Q.OR)

    followings_query.add(names_query, Q.AND)

    return User.objects.filter(followings_query).distinct()
