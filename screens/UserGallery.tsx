import { SectionList, StyleSheet, Text, TouchableOpacity, View } from "react-native"
import { useGetUsersQuery } from "../services/users/user"
import { Album, UserAlbums } from "../services/types"
import { useGetAlbumsQuery } from "../services/album/album"
import { SafeAreaView } from "react-native-safe-area-context"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"

type UserGalleryProps = {
  navigation: NavigationProp<any>
}

function UserGallery({navigation}: UserGalleryProps) {
  const { data: users } = useGetUsersQuery()
  const { data: userAlbums } = useGetAlbumsQuery(users, { skip: !users })

  const [userAlbumsState, setUserAlbumsState] = useState<UserAlbums[] | []>([])

  useEffect(() => {
    if(userAlbums)
      setUserAlbumsState(userAlbums)
  }, [userAlbums])

  const removeAlbum = (albumId: number) => {
    const newArray: UserAlbums[] = []
    userAlbumsState.forEach((users) => {
      newArray.push(
        {
          title: users.title,
          data: users.data.filter((album) => album.id !== albumId)
        }
      )
    })
    setUserAlbumsState(newArray)
  }

  const handleMainRender = (album: Album) => (
    <View style={style.mainContainer}>
      <View style={style.buttonContainer}>
        <TouchableOpacity style={style.textButton}  onPress={() => navigation.navigate("GalleryComponent", {albumId: album.id, albumName: album.title })}>
          <Text style={style.defaultText} numberOfLines={1}>{album.title}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => removeAlbum(album.id)}>
          <Text style={style.closeText}>X</Text>
        </TouchableOpacity>
      </View>
    </View>
  )

  const handleTitleRender = (title: string) => (
    <View style={style.headerContainer}>
      <Text style={style.headerText}>{title}</Text>
    </View>
  )


  return (
    <SafeAreaView style={{flex: 1, backgroundColor: "#D3D3D3"}}>
      <SectionList 
        sections={userAlbumsState} 
        keyExtractor={(item, index) => `${item}${index}`}
        renderItem={(item) => handleMainRender(item.item) }
        renderSectionHeader={({section: {title}}) => handleTitleRender(title)}
        ListEmptyComponent={() => (<View><Text>Nothing to display</Text></View>)}
      />
    </SafeAreaView>  
  )

}

const style = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: "white", padding: 20 },
  buttonContainer: {flexDirection: "row", justifyContent: "space-between", alignItems: "center"},
  textButton: {width: "90%" },
  defaultText: { fontSize: 16, textAlign: "left"  },
  closeText: { fontSize: 20, padding: 10, color: "red"},
  headerContainer: { flex: 1, alignContent: "center", padding: 20, backgroundColor: "#D3D3D3", borderRadius: 6 },
  headerText: { textAlign: "center", fontSize: 20, fontWeight: "bold"},
})

export default UserGallery