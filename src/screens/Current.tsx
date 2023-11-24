import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Screens} from '../../App';
import {Button, Text, View} from 'react-native';

export const Current = ({
  navigation,
}: NativeStackScreenProps<Screens, 'Current'>) => {
  return (
    <View>
      <Text> Current</Text>
      <Button
        onPress={() => navigation.navigate('Previous')}
        title="To Previous"
      />
    </View>
  );
};
