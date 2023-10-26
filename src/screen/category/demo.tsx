<FlatList
          data={data}
          // keyExtractor={(item, index) => item.id.toString()}
          keyExtractor={(item) => item.id ? item.id.toString() : ''}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableScale onPress={() => console.log("code Xem chi tiet data: ", item.name)} activeScale={0.9} friction={9} tension={100}>
              <View style={styles.viewItemCategory}>
                <View style={{ flex: 2 }}>
                  {/* <Image
                    source={{ uri: item.image }}
                    style={styles.imgCategory}
                  /> */}
                  {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.imgCategory} />
                  ) : (
                    <Text>No Image</Text>
                  )}
                </View>
                <View style={styles.viewTextCategory}>
                  <Text style={styles.textNameCategory}>{item.name}</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Text style={styles.textQuantityCategory}>{item.id}</Text>
                    <Text style={styles.textQuantityCategory}> Sản phẩm</Text>
                  </View>
                </View>

                <View style={{ position: 'absolute', right: -17, bottom: 25 }}>
                  <TouchableOpacity onPress={() => console.log("alo")}>
                    <Image
                      style={{ width: 35, height: 35 }}
                      source={require('../../assets/images/btnChuyenMan.png')}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableScale>
          )}
        />