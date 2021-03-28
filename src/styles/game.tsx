import { StyleSheet } from 'react-native';

export const GameStyles = StyleSheet.create({
    gameContainer: {
        alignItems: 'center',
        alignSelf: 'center',
        backgroundColor: '#ECE2C2',
        borderWidth: 2,
        borderRadius: 20,
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        maxWidth: 410,
        minHeight: 120,
        minWidth: 280,
        padding: 10,
        paddingTop: 50,
        justifyContent: 'center',
        shadowColor: '#225500',
        shadowOffset: { height: 4, width: 4 },
        shadowOpacity: 0.5,
    },
    gameStateContainer: {
        marginTop: -20
    },
    preGameTime: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        textAlign: 'center'
    },
    scoreContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -20
    },
});
