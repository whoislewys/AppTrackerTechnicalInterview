import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {Screens} from '../../App';
import {Button, Text, View} from 'react-native';

export const Previous = ({
  navigation,
}: NativeStackScreenProps<Screens, 'Previous'>) => {
  return (
    <View>
      <Text>Previous</Text>
      <Button
        onPress={() => navigation.navigate('Current')}
        title="To Current"
      />
    </View>
  );
};
