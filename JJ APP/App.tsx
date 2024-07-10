import AddEntryScreen from './screens/AddEntryScreen';
import EditEntryScreen from './screens/EditEntryScreen';
import EntriesListScreen from './screens/EntriesListScreen';

// Add these to your Stack Navigator in App.tsx
<Stack.Screen name="AddEntry" component={AddEntryScreen} />
<Stack.Screen name="EditEntry" component={EditEntryScreen} />
<Stack.Screen name="EntriesList" component={EntriesListScreen} />

