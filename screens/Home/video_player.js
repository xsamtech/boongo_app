/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, Alert, Button, TouchableOpacity } from 'react-native';
import React, { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import YoutubePlayer from "react-native-youtube-iframe";
import getVideoId from 'get-video-id';
import { COLORS } from '../../tools/constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const VideoPlayerScreen = ({ route, navigation }) => {
  // =============== Language ===============
  const { t } = useTranslation();

  // =============== Get parameters ===============
  const { videoUri } = route.params;

  // =============== Get data ===============
  const [playing, setPlaying] = useState(false);
  const { id } = getVideoId(videoUri);

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
    <View>
      <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'rgba(219, 51, 55, 0.5)', margin: 10, paddingVertical: 7, paddingHorizontal: 11, borderRadius: 40 / 2 }} onPress={() => navigation.goBack()}>
        <FontAwesome6 style={{ fontSize: 25, color: COLORS.black }} name='angle-left' />
      </TouchableOpacity>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={id}
        onChangeState={onStateChange} />
      <Button title={playing ? 'pause' : 'play'} onPress={togglePlaying} />
    </View>
  );
};

export default VideoPlayerScreen;