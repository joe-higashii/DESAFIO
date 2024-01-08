import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, Button, Modal, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../api/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface Skill {
  id: string;
  imageUrl: string;
  name: string;
  description: string;
}

interface AvailableSkills {
  id: number;
  name: string;
}

type UserSkillLevels = {
  [key: string]: string;
};

const HomeScreen = () => {
  const { token, logout } = useAuth();
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const [userSkills, setUserSkills] = useState<Skill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<AvailableSkills[]>([]);
  const [selectedSkill, setSelectedSkill] = useState('');
  const [skillLevel, setSkillLevel] = useState('Básico');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [userSkillLevels, setUserSkillLevels] = useState<UserSkillLevels>({});

  useEffect(() => {
    if (userSkills.length > 0) {
      const skillLevels: UserSkillLevels = {};
      userSkills.forEach((skill) => {
        skillLevels[skill.id] = skill.description;
      });
      setUserSkillLevels(skillLevels);
    }

    fetchUserSkills();
    fetchAvailableSkills();
  }, []);

  const handleLevelChange = (skillId: string, newLevel: string) => {
    setUserSkillLevels((prevLevels) => ({
      ...prevLevels,
      [skillId]: newLevel,
    }));
  };

  const fetchUserSkills = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const response = await api.get(`/api/user-skills/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUserSkills(response.data);
    } catch (error) {
      console.error('Erro ao buscar skills do usuário', error);
    }
  };

  const fetchAvailableSkills = async () => {
    try {
      const response = await api.get('/api/skills', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAvailableSkills(response.data);
    } catch (error) {
      console.error('Erro ao buscar habilidades disponíveis', error);
    }
  };

  const deleteSkill = async (skillId: string) => {
    try {
      const response = await api.delete(`/api/user-skills/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUserSkills();
      alert('Habilidade excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao deletar habilidade', error);
    }
  };

  const updateSkill = async (userSkillId: string, newLevel: string) => {
    try {
      const response = await api.put(
        `/api/user-skills/${userSkillId}?newLevel=${newLevel.toUpperCase()}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Habilidade atualizada com sucesso!');
      fetchUserSkills();
    } catch (error) {
      console.error('Erro ao atualizar habilidade', error);
    }
  };

  const handleAddSkill = async () => {
    try {
      const response = await api.post(
        '/api/user-skills',
        {
          userId: await AsyncStorage.getItem('userId'),
          skillId: selectedSkill,
          level: skillLevel,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setIsModalOpen(false);
      fetchUserSkills();
    } catch (error) {
      console.error('Erro ao adicionar habilidade', error);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Neki Skills</Text>
        <Text style={styles.subtitle}>Manage your skills efficiently and effectively.</Text>
      </View>
      <ScrollView style={styles.skillList}>
        {userSkills.map((skill) => (
          <View key={skill.id} style={styles.skillItem}>
            <Image
              source={{ uri: skill.imageUrl }}
              style={styles.skillImage}
            />
            <View style={styles.skillInfo}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={styles.skillDescription}>{skill.description}</Text>
              <Picker
                selectedValue={userSkillLevels[skill.id]}
                style={styles.skillLevelPicker}
                onValueChange={(itemValue) => handleLevelChange(skill.id, itemValue)}
              >
                <Picker.Item label="Básico" value="BASICO" />
                <Picker.Item label="Intermediário" value="INTERMEDIARIO" />
                <Picker.Item label="Avançado" value="AVANCADO" />
              </Picker>
              <TouchableOpacity
                style={styles.updateSkillButton}
                onPress={() => updateSkill(skill.id, userSkillLevels[skill.id])}
              >
                <Text style={styles.updateSkillButtonText}>Atualizar Skill</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteSkillButton}
                onPress={() => deleteSkill(skill.id)}
              >
                <Text style={styles.deleteSkillButtonText}>Excluir Skill</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalOpen(true)}
        >
          <Text style={styles.addButtonLabel}>Adicionar Skill</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
        >
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal
        visible={isModalOpen}
        animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar Nova Skill</Text>
            <Picker
              selectedValue={selectedSkill}
              style={styles.modalSkillPicker}
              onValueChange={(itemValue) => setSelectedSkill(itemValue)}
            >
              {availableSkills.map((skill) => (
                <Picker.Item
                  key={skill.id}
                  label={skill.name}
                  value={skill.id}
                />
              ))}
            </Picker>
            <Picker
              selectedValue={skillLevel}
              style={styles.modalSkillLevelPicker}
              onValueChange={(itemValue) => setSkillLevel(itemValue)}
            >
              <Picker.Item label="Básico" value="BASICO" />
              <Picker.Item label="Intermediário" value="INTERMEDIARIO" />
              <Picker.Item label="Avançado" value="AVANCADO" />
            </Picker>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalAddButton}
                onPress={handleAddSkill}
              >
                <Text style={styles.modalAddButtonText}>Adicionar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalCancelButton}
                onPress={() => setIsModalOpen(false)}
              >
                <Text style={styles.modalCancelButtonText}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: 'gray',
  },
  skillList: {
    flex: 1,
    padding: 16,
  },
  skillItem: {
    flexDirection: 'row',
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  skillImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  skillInfo: {
    flex: 1,
    marginLeft: 16,
  },
  skillName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  skillDescription: {
    fontSize: 16,
    color: 'gray',
  },
  skillLevelPicker: {
    marginTop: 8,
  },
  updateSkillButton: {
    backgroundColor: 'blue',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  updateSkillButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteSkillButton: {
    backgroundColor: 'red',
    padding: 8,
    borderRadius: 8,
    marginTop: 8,
    alignItems: 'center',
  },
  deleteSkillButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 16,
  },
  addButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonLabel: {
    color: 'white',
    fontWeight: 'bold',
  },
  logoutButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    width: '80%',
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  modalSkillPicker: {
    marginBottom: 16,
  },
  modalSkillLevelPicker: {
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  modalAddButton: {
    backgroundColor: 'blue',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  modalAddButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalCancelButton: {
    backgroundColor: 'red',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    flex: 1,
  },
  modalCancelButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
