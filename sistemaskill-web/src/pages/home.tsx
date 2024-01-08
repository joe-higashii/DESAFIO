import { useEffect, useState } from "react";
import api from "@/services/api";
import { useAuth } from "@/context/AuthContext";
import DarkModeToggle from "@/components/DarkModeToggle";

type UserSkillLevels = {
  [key: number]: string;
};

const HomePage = () => {
  const { token, logout } = useAuth();
  const [userSkills, setUserSkills] = useState<UserSkill[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [availableSkills, setAvailableSkills] = useState<AvailableSkills[]>([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [skillLevel, setSkillLevel] = useState("Básico");
  const [newSkillLevel, setNewSkillLevel] = useState("");
  const [userSkillLevels, setUserSkillLevels] = useState<UserSkillLevels>({});

  useEffect(() => {
    if (userSkills.length > 0) {
      const skillLevels: UserSkillLevels = {};
      userSkills.forEach((skill) => {
        skillLevels[skill.id] = skill.level;
      });
      setUserSkillLevels(skillLevels);
    }
  }, [userSkills]);

  const handleLevelChange = (skillId: number, newLevel: string) => {
    setUserSkillLevels((prevLevels) => ({
      ...prevLevels,
      [skillId]: newLevel,
    }));
  };

  const fetchUserSkills = async () => {
    try {
      const userId = localStorage.getItem("userId");
      const response = await api.get(`/api/user-skills/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("User skills response:", response);
      setUserSkills(response.data);
    } catch (error) {
      console.error("Erro ao buscar skills do usuário", error);
    }
  };

  const fetchAvailableSkills = async () => {
    try {
      const response = await api.get("/api/skills", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Available skills response:", response);
      setAvailableSkills(response.data);
    } catch (error) {
      console.error("Erro ao buscar habilidades disponíveis", error);
    }
  };

  const deleteSkill = async (skillId: number) => {
    try {
      const response = await api.delete(`/api/user-skills/${skillId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("Delete skill response:", response);
      fetchUserSkills();
      alert("Habilidade excluída com sucesso!");
    } catch (error) {
      console.error("Erro ao deletar habilidade", error);
    }
  };

  const updateSkill = async (userSkillId: number, newLevel: string) => {
    try {
      const response = await api.put(
        `/api/user-skills/${userSkillId}?newLevel=${newLevel.toUpperCase()}`,
        null,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Update skill response:", response);
      alert("Habilidade atualizada com sucesso!");
      fetchUserSkills();
    } catch (error) {
      console.error("Erro ao atualizar habilidade", error);
    }
  };

  const handleAddSkill = async () => {
    try {
      const response = await api.post(
        "/api/user-skills",
        {
          userId: localStorage.getItem("userId"),
          skillId: selectedSkill,
          level: skillLevel,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Add skill response:", response);
      setIsModalOpen(false);
      fetchUserSkills();
    } catch (error) {
      console.error("Erro ao adicionar habilidade", error);
    }
  };

  useEffect(() => {
    fetchUserSkills();
    fetchAvailableSkills();
  }, []);

  return (
    <section className="bg-white dark:bg-gray-900">
          <DarkModeToggle />
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Neki Skills
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Manage your skills efficiently and effectively.
          </p>
        </div>
        <div className="grid gap-8 mb-6 lg:mb-16 md:grid-cols-2">
          {userSkills.map((skill) => (
            <div
              key={skill.id}
              className="items-center bg-gray-50 rounded-lg shadow sm:flex dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                className="p-2 w-32 h-32 rounded-lg sm:rounded-none sm:rounded-l-lg"
                src={skill.imageUrl}
                alt={skill.name}
              />
              <div className="p-5">
                <h3 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {skill.name}
                </h3>
                <p className="text-xl mt-3 mb-4 font-light text-gray-500 dark:text-gray-400">
                  {skill.description}
                </p>
                <select
                  value={userSkillLevels[skill.id]}
                  onChange={(e) => handleLevelChange(skill.id, e.target.value)}
                  className="bg-gray-50 dark:bg-gray-600 text-xl mb-2 w-full rounded-lg text-gray-900 dark:text-white"
                >
                  <option
                    className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                    value="BASICO"
                  >
                    Básico
                  </option>
                  <option
                    className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                    value="INTERMEDIARIO"
                  >
                    Intermediário
                  </option>
                  <option
                    className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                    value="AVANCADO"
                  >
                    Avançado
                  </option>
                </select>
                <button
                  onClick={() =>
                    updateSkill(skill.id, userSkillLevels[skill.id])
                  }
                  className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Atualizar Skill
                </button>
                <button
                  onClick={() => deleteSkill(skill.id)}
                  className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-2"
                >
                  Excluir Skill
                </button>
              </div>
            </div>
          ))}
        </div>
        {isModalOpen && (
          <div id="select-modal" className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen">
              <div className="relative w-full max-w-md p-4 mx-auto bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex justify-between p-4 border-b dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Adicionar nova skill
                  </h3>
                  {/* <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  >
                    <span className="sr-only">Fechar</span>X
                  </button> */}
                </div>
                <div className="p-4">
                  <select
                    value={selectedSkill}
                    onChange={(e) => setSelectedSkill(e.target.value)}
                    className="bg-gray-50 dark:bg-gray-600 mb-4 w-full rounded-lg text-xl text-gray-900 dark:text-white"
                  >
                    {availableSkills.map((skill) => (
                      <option
                        className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                        key={skill.id}
                        value={skill.id}
                      >
                        {skill.name}
                      </option>
                    ))}
                  </select>
                  <select
                    value={skillLevel}
                    onChange={(e) => setSkillLevel(e.target.value)}
                    className="mb-4 w-full rounded-lg bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                  >
                    <option
                      className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                      value="BASICO"
                    >
                      Básico
                    </option>
                    <option
                      className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                      value="INTERMEDIARIO"
                    >
                      Intermediário
                    </option>
                    <option
                      className="bg-gray-50 dark:bg-gray-600 text-xl text-gray-900 dark:text-white"
                      value="AVANCADO"
                    >
                      Avançado
                    </option>
                  </select>
                  <div className="flex gap-2">
                  <button
                    onClick={handleAddSkill}
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Adicionar
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="w-full bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Cancelar
                  </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex-col">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-1"
          >
            Adicionar Skill
          </button>
          <button
            onClick={logout}
            className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
