import { StyleSheet } from "react-native";



const DashboardScreenStyles = StyleSheet.create({
    
  container: {
    flex: 1,
    padding: 10,
    // light maroon with transparency (blur-like effect)
  },
  mainContent: {
    paddingBottom: 100, // or any safe value to prevent clipping
  },
  

  header: {
    flexDirection: "row", // layout children horizontally
    justifyContent: "flex-start", // aligns children to the LEFT (horizontal)
    alignItems: "center",
    backgroundColor: "#800000",
    height: 60,
    marginHorizontal: 20,
    paddingHorizontal: 20,
    marginTop: 60,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 50,
  },

  postAvatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 8,
  },

  postUsername: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#333",
  },

  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 100,
    marginRight: 10,
    borderWidth: 4, // thickness of the border
    borderColor: "red", // color of the border
    marginTop: -4, // moves avatar 20 units down
    marginLeft: -30,
  },

  username: {
    color: "white",
    fontWeight: "bold",
  },

  userHandle: {
    color: "#ccc",
    fontSize: 12,
  },

  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#a94444",
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 35,
    flexShrink: 1,
    marginLeft: 24,
  },

  searchInput: {
    color: "white",
    width: 70,
    marginRight: 6,
  },
  searchNotifWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6, // If your version doesn’t support `gap`, use margin instead
  },

  notifIcon: {
    padding: 1,
    borderRadius: 10,
    backgroundColor: "#444", // or any background color you prefer
    justifyContent: "center",
    alignItems: "center",
  },

  headerDivider: {
    height: 1,
    backgroundColor: "#ccc",
    marginTop: 8,
  },

  togglePostButton: {
    position: 'absolute',
    bottom: 70, // slightly above floating menu
    right: 20,
    // backgroundColor: 'black', ← removed
    color: 'white',
    width: 60,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
    zIndex: 999,
  },
  
  
  togglePostButtonText: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  
  floatingPostInput: {
    position: 'absolute',
    bottom: 60,
    left: 20,
    right: 20,
    backgroundColor: '#800000',
    borderRadius: 10,
    padding: 10,
    
    elevation: 5,
  },
  
  
  floatingTitleInput: {
    fontSize: 16,
    fontWeight: '600',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    marginBottom: 6,
    paddingVertical: 20,
    color: 'white', // 🔴 Maroon text color
  },
  
  
  floatingPostInputBox: {
    fontSize: 14,
    height: 100,
    textAlignVertical: 'top',
    color: '',
    padding: 6,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 6,
    marginBottom: 8,
  },
  
  floatingPostButton: {
    backgroundColor: '#800000',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    width: 50, // or '80%' for responsive sizing
    alignItems: 'flex-start', // aligns children to the left
  },
  
  floatingPostButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'left', // aligns text inside button
    alignSelf: 'flex-start', // aligns the text block to the left of the parent
  },
  

  newPostInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 14,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    maxHeight: 100,
    marginRight: 10,
  },

  mainContent: {
    flex: 1,
    alignItems: "center",
    padding: 20,
  },

  postOuterContainer: {
    width: "100%",
    alignItems: "center",
    padding: 16,
  },

  postContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginVertical: 50,
    width: "90%", // or use fixed width like 340
    alignSelf: "center", // 💡 This centers the post container
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },

  postLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 8,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
    padding: 8,
    borderWidth: 1, // ✅ Add border
    borderColor: 'black', // ✅ Maroon border
    borderRadius: 6, // Optional: make it look cleaner
    backgroundColor: '#fff', // Optional: white background
  },
  
  postContent: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    marginBottom: 12,
    padding: 8,
    borderWidth: 1, // ✅ Add border
    borderColor: 'black', // ✅ Maroon border
    borderRadius: 6, // Optional
    backgroundColor: '#fff', // Optional
  },
  

  commentInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    padding: 8,
    fontSize: 14,
    marginTop: 8,
    backgroundColor: 'white',
  },
  
  
  

  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'center', // ⬅ center align horizontally
    alignItems: 'center',
    marginTop: 10,
    gap: 12, // space between buttons
  },
  

  floatingMenu: {
    position: "absolute",
    bottom: 20,
    right: 270,
    backgroundColor: "black",
    paddingVertical: 2,
    paddingHorizontal: 15,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 6,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    color: "white",
    fontWeight: "bold",
    marginLeft: 6,
    fontSize: 14,
  },
  newTitleInput: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 4,
  },
  
  
});

export default DashboardScreenStyles;
