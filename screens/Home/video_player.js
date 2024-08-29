/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Alert, Button, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import YoutubePlayer from "react-native-youtube-iframe";
import getVideoId from 'get-video-id';
import { COLORS } from '../../tools/constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import homeStyles from './style';
import TextBrand from '../../assets/img/text.svg';

const VideoPlayerScreen = ({ route, navigation }) => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Get parameters ===============
  const { videoTitle, videoUri } = route.params;
  const video_title = JSON.stringify(videoTitle);
  const video_uri = JSON.stringify(videoUri);

  // =============== Get data ===============
  const [playing, setPlaying] = useState(false);
  const { id } = getVideoId(video_uri);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert(t('video_ended'));
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev);
    console.log(id);
  }, []);

  return (
    <ScrollView>
      {/* Header */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'rgba(219, 51, 55, 0.5)', margin: 10, paddingVertical: 7, paddingHorizontal: 11, borderRadius: 40 / 2 }} onPress={() => navigation.goBack()}>
          <FontAwesome6 style={{ fontSize: 25, color: COLORS.black }} name='angle-left' />
        </TouchableOpacity>
        <TextBrand width={140} height={55} style={{ marginLeft: 50 }} />
      </View>

      {/* Content */}
      <YoutubePlayer
        height={((Dimensions.get('window').width / 16) * 9) + 1}
        play={playing}
        videoId={id}
        onChangeState={onStateChange} />
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
      <View style={[homeStyles.cardEmpty, { width: Dimensions.get('window').width - 10, marginTop: 50, padding: 10 }]}>
        <Image source={require('../../assets/img/ad.png')} style={{ width: '100%', height: Dimensions.get('screen').width / 1.2, borderRadius: 20 }} />
      </View>
    </ScrollView>
  );
};

export default VideoPlayerScreen;