import { grey } from '@material-ui/core/colors';

export const greyText = grey[500];
export const styles = (theme) => ({
  searchCard: {
    maxWidth: 238
  },
  cardContent: {
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5
  },
  cardMediaLabel: {
    position: 'absolute',
    right: 0,
    top: 118,
    marginRight: 4,
    color: '#FFFFFF'
  },
  cardActions: {
    paddingTop: 0,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 5
  },
  subText: {
    fontSize: 10,
    color: greyText
  },
  icon: {
    fontSize: 14,
    color: greyText
  },
  iconLabel: {
    fontSize: 10,
    color: greyText,
    marginLeft: 4,
    marginRight: 14
  },
});
