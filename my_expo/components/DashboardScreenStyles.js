import { StyleSheet } from 'react-native';

const DashboardScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: 'rgba(128, 0, 0, 0.1)', // light maroon with transparency (blur-like effect)
      },
      

      header: {
        flexDirection: 'row',         // layout children horizontally
        justifyContent: 'flex-start', // aligns children to the LEFT (horizontal)
        alignItems: 'center',        
        backgroundColor: '#800000',
        height: 60,
        marginHorizontal: 20,
        paddingHorizontal: 20,
        marginTop: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 6,
        elevation: 6,
      },
      
  
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },
  
  postUsername: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  
  username: {
    color: 'white',
    fontWeight: 'bold',
  },
  
  userHandle: {
    color: '#ccc',
    fontSize: 12,
  },
  
  searchSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a94444',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
    marginLeft: 'auto', // 👈 pushes to the end of row
  },
  
  
  searchInput: {
    color: 'white',
    width: 50   ,
    marginRight: 6,
  },
  
  
  headerDivider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 8,
  },
  

  postInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    margin: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  
  newPostInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    maxHeight: 100,
    marginRight: 10,
  },
  
  postButtonWrapper: {
    justifyContent: 'center',
  },
  

  mainContent: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },

  postOuterContainer: {
    width: '100%',
    alignItems: 'center',
    padding: 16,
  },

  postContainer: {
    width: 280,
    backgroundColor: '#f4f4f4',
    padding: 16,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    marginBottom: 16,
    alignItems: 'center',
  },

  postLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 8,
  },

  postContent: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
  },

  commentInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 14,
    marginBottom: 12,
    backgroundColor: '#fff',
  },

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    gap: 8,
  },
});

export default DashboardScreenStyles;
