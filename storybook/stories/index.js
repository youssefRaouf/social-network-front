import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { normalPost, likedPost } from '../../components/Post.stories';


storiesOf('components', module).add('normalPost',()=> normalPost);
storiesOf('components', module).add('likedPost',()=> likedPost);


