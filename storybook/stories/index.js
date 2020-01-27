import React from 'react';
import { Text } from 'react-native';

import { storiesOf } from '@storybook/react-native';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Button from './Button';
import CenterView from './CenterView';
import Welcome from './Welcome';
import { Post} from '../../components/Post';

storiesOf('components', module).add('post', () => <Post text="this is a post" user_name="youssef raouf" created_at="6 hr"></Post>);
