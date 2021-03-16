<FlatList
    data={dataSource}
    renderItem={({ item, index }) => (
        <View style={{ flex: 1, flexDirection: 'column', margin: 4, marginTop: index !== 0 && index % 2 === 0 ? -20 : 0 }}>
            {index == 1 ? <View style={{ width: 10, height: 20 }} /> : null}

            <Image style={styles.imageThumbnail} source={{ uri: item.src }} />
        </View>
    )}
    //Setting the number of column
    numColumns={2}
    keyExtractor={(item, index) => index}
/>