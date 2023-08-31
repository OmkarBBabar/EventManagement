import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { DateTimePickerModal } from 'react-native-modal-datetime-picker';
import { ImagePicker } from 'react-native-image-crop-picker';
// import { ModalSelector } from 'react-native-modal-selector';
import {collection, doc, addDoc} from '@firebase/firestore';
import { Icon } from 'react-native-vector-icons/FontAwesome';
import {db} from './config';
import  { locale } from 'date-fns/locale/en-US';
// import {SelectList} from 'react-native-dropdown-select-list';
// import {deDE} from '@mui/x-date-pickers/locales';
// import {DatePicker} from '@mui/lab';
import {AdapterDateFns} from '@mui/lab/AdapterDateFns';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
// import {TimePicker} from '@mui/x-date-pickers/TimePicker';
import {format} from 'date-fns';
// import { BottomSheet } from '@gorhom/bottom-sheet';
import {
  BottomSheetModal,
  BottomSheetScrollView,
} from 'react-native-bottom-sheet';

const EventScreen = () => {
  // const [addData, setAddData] =useState('');
  const [name, setName] = useState('');
  const [tagline, setTagline] = useState('');
  const [address, setAddress] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isStartDatePickerVisible, setStartDatePickerVisible] = useState(false);
  const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false);
  const [registrationStartDate, setRegistrationStartDate] = useState(null);
  const [registrationEndDate, setRegistrationEndDate] = useState(null);
  const [registrationFee, setRegistrationFee] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [selected, setSelected] = React.useState('');
  const [endDate, setEndDate] = useState(null);
  const bottomSheetRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);

  const openSelectList = () => {
    bottomSheetRef.current?.present();
  };

  const closeSelectList = () => {
    bottomSheetRef.current?.close();
  };

  const handleSelectType = value => {
    setSelectedType(value);
    closeSelectList();
  };

  // const getFormattedDateTime = date => {
  //   if (!date) return '';
  //   return format(date, 'dd/MM/yyyy HH:mm:ss', {locale});
  // };
  // const showStartDatePicker = () => {
  //   setStartDatePickerVisible(true);
  // };

  // const hideStartDatePicker = () => {
  //   setStartDatePickerVisible(false);
  // };

  // const showEndDatePicker = () => {
  //   setEndDatePickerVisible(true);
  // };

  // const hideEndDatePicker = () => {
  //   setEndDatePickerVisible(false);
  // };
  // const RegisterStartConfirm = startDate => {
  //   setRegistrationStartDate(startDate);
  // };

  // const RegisterEndConfirm = endDate => {
  //   setRegistrationEndDate(endDate);
  // };

  function create() {
    addDoc(collection(db, 'event'), {
      name: name,
      tagline: tagline,
      address: address,
      type: selectedType ? selectedType.label : null,
      image: selectedImage ? selectedImage.uri : null,
      registrationStartDate: registrationStartDate,
      registrationEndDate: registrationEndDate,
      registrationFee: registrationFee,
    })
      .then(() => {
        console.log('Data submitted');
      })
      .catch(error => {
        console.log(error);
      });
  }

  const data = [
    {key: '1', value: 'EVENT TYPE', disabled: true},
    {key: '2', value: 'CRICKET'},
    {key: '4', value: 'ART'},
    {key: '5', value: 'OPTION 1'},
    {key: '6', value: 'OPTION 2'},
    {key: '7', value: 'OPTION 3'},
    {key: '8', value: 'OPTION 4'},
    {key: '9', value: 'OPTION 5'},
    {key: '10', value: 'OPTION 6'},
  ];

  const handleImageUpload = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: false,
    })
      .then(response => {
        const source = {uri: response.path};
        setSelectedImage(source);
        console.log(source);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <ScrollView>
      <LocalizationProvider dateAdapter={AdapterDateFns} locale={locale}>
        <View style={styles.container}>
          <Text style={styles.heading}>Register Your Event</Text>

          <TextInput
            style={styles.input}
            placeholder="Event name"
            value={name}
            keyboardType="default"
            onChangeText={name => {
              setName(name);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Tagline"
            value={tagline}
            keyboardType="default"
            onChangeText={tagline => {
              setTagline(tagline);
            }}
          />
          <TextInput
            style={styles.input}
            placeholder="Event Address"
            value={address}
            onChangeText={address => {
              setAddress(address);
            }}
            keyboardType="email-address"
          />
          <View style={{marginVertical: 10}} />

          <TouchableOpacity style={styles.selectType} onPress={openSelectList}>
            <Text>
              {selectedType ? selectedType.value : 'Select Event Type'}
            </Text>
          </TouchableOpacity>

          <BottomSheetModal
            ref={bottomSheetRef}
            snapPoints={['25%', '50%', '75%']}
            backdropComponent={() => (
              <TouchableOpacity
                style={StyleSheet.absoluteFill}
                onPress={closeSelectList}
              />
            )}>
            <View style={styles.bottomSheetContent}>
              <BottomSheetScrollView>
                {data.map(item => (
                  <TouchableOpacity
                    key={item.key}
                    style={styles.selectOption}
                    onPress={() => handleSelectType(item)}
                    disabled={item.disabled}>
                    <Text>{item.value}</Text>
                  </TouchableOpacity>
                ))}
              </BottomSheetScrollView>
            </View>
          </BottomSheetModal>

          <View style={{marginVertical: 10}} />

          <TouchableOpacity
            style={styles.datePicker}
            onPress={showStartDatePicker}>
            <Icon
              name="calendar"
              size={20}
              color="#999"
              style={styles.calendarIcon}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Select Registration Start Date and Time"
              editable={false}
              value={getFormattedDateTime(registrationStartDate)}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isStartDatePickerVisible}
            mode="datetime"
            onConfirm={date => {
              RegisterStartConfirm(date);
              hideStartDatePicker();
            }}
            onCancel={hideStartDatePicker}
          />

          <TouchableOpacity
            style={styles.datePicker}
            onPress={showEndDatePicker}>
            <Icon
              name="calendar"
              size={20}
              color="#999"
              style={styles.calendarIcon}
            />
            <TextInput
              style={styles.dateInput}
              placeholder="Select Registration End Date and Time"
              editable={false}
              value={getFormattedDateTime(registrationEndDate)}
            />
          </TouchableOpacity>

          <DateTimePickerModal
            isVisible={isEndDatePickerVisible}
            mode="datetime"
            onConfirm={date => {
              RegisterEndConfirm(date);
              hideEndDatePicker();
            }}
            onCancel={hideEndDatePicker}
          />

          <View style={{marginVertical: 10}} />
          <TextInput
            style={styles.input}
            placeholder="Registration Fee"
            value={registrationFee}
            onChangeText={registrationFee => {
              setRegistrationFee(registrationFee);
            }}
            maxLength={6}
            keyboardType="numeric"
          />
          <View style={{marginVertical: 10}} />
          <View style={styles.section}>
            <Button
              title="Click to Upload Event Image"
              style={styles.btn}
              onPress={handleImageUpload}
              onChangeText={selectedImage => {
                setSelectedImage(selectedImage);
              }}
            />
            {selectedImage && (
              <Image
                source={selectedImage}
                style={{
                  width: 250,
                  height: 250,
                  marginBottom: 16,
                  marginLeft: 60,
                  marginTop: 5,
                }}
              />
            )}
            <View style={{marginVertical: 10}} />
            <TouchableOpacity style={styles.button} onPress={create}>
              <Text style={styles.buttonText}>Submit</Text>

              {showAlert && (
                <View style={styles.alertContainer}>
                  <Text style={styles.alertText}>
                    Data submitted successfully!
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </LocalizationProvider>
    </ScrollView>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  alertContainer: {
    backgroundColor: '#f8d7da',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  alertText: {
    color: '#721c24',
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#999',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  calendarIcon: {
    marginRight: 8,
  },
  dateInput: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  selectType: {
    height: 40,
    borderColor: '#999',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  bottomSheetContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  selectOption: {
    height: 40,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#999',
  },
});
export default EventScreen;