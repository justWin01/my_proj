import { StyleSheet } from 'react-native';

const DashboardScreenStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',// Maroon background
        padding: 10,
      },
      

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#800000',
    height: 100,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
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
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },

  postInputContainer: {
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f8f8',
  },

  newPostInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 14,
    backgroundColor: '#fff',
    height: 80,
    width: '90%',
    marginBottom: 10,
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
