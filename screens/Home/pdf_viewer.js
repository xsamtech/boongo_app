/**
 * @author Xanders
 * @see https://team.xsamtech.com/xanderssamoth
 */
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import { COLORS } from '../../tools/constants';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const PDFViewerScreen = ({ route, navigation }) => {
  // =============== Get parameters ===============
  const { docUri } = route.params;

  // =============== Get parameters ===============
  const source = { uri: docUri, cache: true };

  return (
    <ScrollView contentContainerStyle={{ flex: 1, paddingBottom: 50 }}>
      <TouchableOpacity style={{ width: 40, height: 40, backgroundColor: 'rgba(219, 51, 55, 0.5)', margin: 10, paddingVertical: 7, paddingHorizontal: 11, borderRadius: 40 / 2 }} onPress={() => navigation.goBack()}>
        <FontAwesome6 style={{ fontSize: 25, color: COLORS.black }} name='angle-left' />
      </TouchableOpacity>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center', marginTop: 25, }}>
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={(error) => {
            console.log(error);
          }}
          onPressLink={(uri) => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={{ flex: 1, width: Dimensions.get('window').width, height: Dimensions.get('window').height, }} />
      </View>
    </ScrollView>
  );
};

export default PDFViewerScreen;