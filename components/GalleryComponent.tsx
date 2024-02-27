import { Dimensions, FlatList, Image, SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { Photo } from "../services/types"
import { useGetAllPhotosQuery, useGetPhotosQuery } from "../services/photos/photo"
import { NavigationProp, RouteProp } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import { useEffect, useState } from "react"

type Params = {
  params: {
    albumId: number,
    albumName: string
  }
}

type GalleryComponentProps = {
  navigation: NavigationProp<any>
  route: RouteProp<Params>
}

export const GalleryComponent = ({ navigation, route }: GalleryComponentProps) => {
  const { albumId, albumName } = route.params
  const [ showAllPhotos, setShowAllPhotos] = useState<boolean>(false)
  const { data: albumPhotos } = useGetPhotosQuery(albumId, { skip: showAllPhotos})
  const { data: allPhotos } = useGetAllPhotosQuery(undefined, { skip: !showAllPhotos})
  const [photos, setPhotos] = useState<Photo[] | null> (null)
  const imageWidth = Math.floor((Dimensions.get("window").width - 40) / 3)  // Since the padding is 10 you need to take that into account
  
  useEffect(() => {
    if(showAllPhotos && allPhotos) {
      setPhotos(allPhotos)
    } else if(!showAllPhotos && albumPhotos){
      setPhotos(albumPhotos)
    }
  }, [showAllPhotos, albumPhotos, allPhotos])
  

    return (
      <SafeAreaView style={style.safeAreaContainer}>
        <FlatList
          ListHeaderComponent={() => {
            return (
              <View style={style.headerContainer}>
                <TouchableOpacity style={style.backButton} onPress={() => navigation.goBack()}>
                  <Text style={style.backButtonText}>{`< Back`}</Text>
                </TouchableOpacity>
                <View style={style.titleContainer}>
                  <Text style={style.titleText}>{showAllPhotos ? "All" : albumName}</Text>
                </View>
                <TouchableOpacity style={style.switchPhotosButton} onPress={() => setShowAllPhotos(!showAllPhotos)}>
                  <Text style={style.switchPhotosIcon}>*</Text>
                </TouchableOpacity>
              </View>
            )
          }}
          data={photos}
          keyExtractor={(item, index) => `${item}_${index}_photo`}
          numColumns={3}
          renderItem={(item) => {
            return (<View style={style.mainContainer}>
              <Image source={{uri:item.item.thumbnailUrl}} width={imageWidth} height={imageWidth} resizeMode="contain" />
            </View>)
          }}
          ListEmptyComponent={() => (<View><Text>Nothing to display</Text></View>)}
        />
      </SafeAreaView>
    )
  
}

const style = StyleSheet.create({
  safeAreaContainer: {flex: 1},
  headerContainer: { height: 50,  backgroundColor: "#D3D3D3", flexDirection: "row", justifyContent: "space-between", padding: 10},
  backButton: { justifyContent: "center"},
  backButtonText: { textAlign: "center"},
  titleContainer: { justifyContent: "center"},
  titleText: { textAlign: "center"},
  switchPhotosButton: { justifyContent: "center"},
  switchPhotosIcon: { textAlign: "center"},
  mainContainer: { flex: 1, padding: 10 },


})