import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Input } from '@ui-kitten/components';

const Search = () => {
    const [value, setValue] = React.useState<string>('');
    console.log(value);
    
  return (
    <View style={styles.searchContainer} >
      <Input size='small' placeholder='Search Youtube'  style={styles.searchInput}  onChangeText={(nextValue) => setValue(nextValue)} />
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
    searchContainer:{},
    searchInput:{
        borderRadius:15,
        width:340,
        marginLeft:30,
        marginTop:10
        

    }
})