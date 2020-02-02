import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { normalPost, likedPost } from '../../components/Post.stories';
import { normalUser } from '../../components/User.stories';


// storiesOf('components', module).add('normalPost',()=> normalPost);
// storiesOf('components', module).add('likedPost',()=> likedPost);
storiesOf('components', module).add('User',()=> normalUser);


