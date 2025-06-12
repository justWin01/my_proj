import {StyleSheet} from 'react-native';

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
		flexDirection: 'row', // layout children horizontally
		justifyContent: 'flex-start', // aligns children to the LEFT (horizontal)
		alignItems: 'center',
		backgroundColor: '#800000',
		height: 60,
		marginHorizontal: 20,
		paddingHorizontal: 20,
		marginTop: 60,
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 4
		},
		shadowOpacity: 0.2,
		shadowRadius: 6,
		elevation: 6
	},


	postHeader: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 8
	},

	postAvatar: {
		width: 30,
		height: 30,
		borderRadius: 15,
		marginRight: 8
	},

	postUsername: {
		fontWeight: 'bold',
		fontSize: 14,
		color: '#333'
	},

	userInfo: {
		flexDirection: 'row',
		alignItems: 'center'
	},

	avatar: {
		width: 80,
		height: 80,
		borderRadius: 100,
		marginRight: 10,
		borderWidth: 4, // thickness of the border
		borderColor: 'red', // color of the border
		marginTop: -4, // moves avatar 20 units down
		marginLeft: -30
	},


	username: {
		color: 'white',
		fontWeight: 'bold'
	},

	userHandle: {
		color: '#ccc',
		fontSize: 12
	},

	searchSection: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#a94444',
		borderRadius: 8,
		paddingHorizontal: 10,
		height: 35,
		flexShrink: 1,
		marginLeft: 24
	},

	searchInput: {
		color: 'white',
		width: 50,
		marginRight: 6
	},
	searchNotifWrapper: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 6, // If your version doesn’t support `gap`, use margin instead
	},

	notifIcon: {
		padding: 6,
		borderRadius: 20,
		backgroundColor: '#444', // or any background color you prefer
		justifyContent: 'center',
		alignItems: 'center'
	},


	headerDivider: {
		height: 1,
		backgroundColor: '#ccc',
		marginTop: 8
	},


	postInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		padding: 10,
		borderRadius: 10,
		margin: 30,
		elevation: 3,
		shadowColor: '#000',
		shadowOpacity: 0.1,
		shadowRadius: 4,
		shadowOffset: {
			width: 0,
			height: 2
		}
	},

	newPostInput: {
		flex: 1,
		paddingHorizontal: 12,
		paddingVertical: 8,
		fontSize: 14,
		backgroundColor: '#f5f5f5',
		borderRadius: 8,
		maxHeight: 100,
		marginRight: 10
	},

	postButtonWrapper: {
		justifyContent: 'center'
	},


	mainContent: {
		flex: 1,
		alignItems: 'center',
		padding: 20
	},

	postOuterContainer: {
		width: '100%',
		alignItems: 'center',
		padding: 16
	},

	postContainer: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 16,
        marginVertical: 10,
        width: '90%', // or use fixed width like 340
        alignSelf: 'center', // 💡 This centers the post container
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // for Android shadow
      },
      

	postLabel: {
		fontSize: 16,
		fontWeight: '500',
		marginBottom: 8
	},

	postContent: {
		fontSize: 14,
		color: '#333',
		textAlign: 'center',
		marginBottom: 12
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
		backgroundColor: '#fff'
	},

	actionsRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		gap: 8
	}
});

export default DashboardScreenStyles;
