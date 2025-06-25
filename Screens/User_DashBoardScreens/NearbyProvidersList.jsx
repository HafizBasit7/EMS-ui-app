import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dummyVerticalData } from '../../dummydata/dummydata';

const NearbyProvidersList = () => {
  const navigation = useNavigation();

  const renderProviderCard = (item) => (
    <View key={item.id} style={styles.providerCard}>
      <Image source={{ uri: item.profilePic }} style={styles.providerImage} />
      <View style={styles.providerContent}>
        <View style={styles.providerHeader}>
          <Text style={styles.providerName}>{item.name}</Text>
          <Text style={styles.providerLocation}>📍 {item.location}, USA</Text>
        </View>

        <View style={styles.tagsRow}>
          <Text style={styles.tag}>{item.expertise[0]}</Text>
          {item.expertise.length > 1 && (
            <Text style={styles.tag}>+{item.expertise.length - 1}</Text>
          )}
          <Text style={styles.experienceText}>15 yrs Experience</Text>
        </View>

        <View style={styles.ratingRow}>
          <Text style={styles.rating}>⭐ {item.reviews}</Text>
          <Text style={styles.reviewCount}>• 12 Reviews</Text>
        </View>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={() => navigation.navigate('ProviderProfile', { id: item.id })}
        >
          <Text style={styles.profileButtonText}>View Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.title}>Nearby Service Providers</Text>
      {dummyVerticalData.map(renderProviderCard)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
    paddingHorizontal: 16,
  },
  providerCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 16,
    flexDirection: 'row',
    elevation: 3,
    padding: 12,
  },
  providerImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  providerContent: {
    flex: 1,
    marginLeft: 12,
  },
  providerHeader: {
    marginBottom: 4,
  },
  providerName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  providerLocation: {
    color: '#888',
    fontSize: 12,
  },
  tagsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#eee',
    color: '#000',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    fontSize: 11,
    marginRight: 6,
  },
  experienceText: {
    marginLeft: 8,
    color: '#555',
    fontSize: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rating: {
    color: '#f7b500',
    fontSize: 13,
    fontWeight: 'bold',
  },
  reviewCount: {
    marginLeft: 6,
    color: '#888',
    fontSize: 12,
  },
  profileButton: {
    marginTop: 8,
    backgroundColor: 'orange',
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 8,
  },
  profileButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 13,
  },
});

export default NearbyProvidersList;
