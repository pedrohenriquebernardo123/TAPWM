import { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const [alunos, setAlunos] = useState([]);
  const [busca, setBusca] = useState('');
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState('');
  const [consulta, setConsulta] = useState(0);

  useEffect(() => {
    let ativo = true;
    const controle = new AbortController();
    const limite = setTimeout(() => controle.abort(), 15000);

    async function buscarAlunos() {
      try {
        const resposta = await fetch(
          `https://randomuser.me/api/?nat=br&results=5&inc=login,name,location&seed=${Date.now()}-${consulta}`,
          { signal: controle.signal },
        );
        if (!resposta.ok) throw new Error('Falha na consulta');
        const dados = await resposta.json();
        if (!Array.isArray(dados.results)) throw new Error('Resposta inválida');
        const lista = dados.results.map((pessoa) => {
          if (!pessoa?.login?.uuid || !pessoa?.name?.first || !pessoa?.name?.last) throw new Error('Perfil inválido');
          return {
            id: pessoa.login.uuid,
            nome: pessoa.name.first + ' ' + pessoa.name.last,
            cidade: pessoa.location?.city || 'Cidade não informada',
            pais: pessoa.location?.country === 'Brazil' ? 'Brasil' : pessoa.location?.country || '',
          };
        });
        if (ativo) setAlunos(lista);
      } catch {
        if (ativo) setErro('Não foi possível buscar os alunos. Confira sua internet e tente novamente.');
      } finally {
        clearTimeout(limite);
        if (ativo) setCarregando(false);
      }
    }

    buscarAlunos();
    return () => { ativo = false; clearTimeout(limite); controle.abort(); };
  }, [consulta]);

  function atualizar() {
    setCarregando(true);
    setErro('');
    setConsulta(consulta + 1);
  }

  function simplificar(texto) {
    return texto.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  const visiveis = alunos.filter((aluno) => simplificar(aluno.nome + ' ' + aluno.cidade).includes(simplificar(busca.trim())));

  return (
    <SafeAreaProvider>
      <SafeAreaView style={estilos.tela}>
        <StatusBar style="dark" />
        <View style={estilos.conteudo}>
          <Text style={estilos.etiqueta}>ATIVIDADE 24 · MOBILE</Text>
          <Text role="heading" aria-level={1} style={estilos.titulo}>Minha turma</Text>
          <Text style={estilos.descricao}>Uma lista simples para conhecer os alunos.</Text>

          <View style={estilos.ferramentas}>
            <Text accessibilityLiveRegion="polite" style={estilos.total}>{visiveis.length} de {alunos.length} alunos</Text>
            <Pressable role="button" accessibilityLabel="Atualizar lista" disabled={carregando} onPress={atualizar} style={[estilos.botao, carregando && estilos.desabilitado]}>
              <Text style={estilos.botaoTexto}>{carregando ? 'Buscando...' : 'Atualizar'}</Text>
            </Pressable>
          </View>

          <TextInput
            accessibilityLabel="Buscar por nome ou cidade"
            placeholder="Buscar por nome ou cidade"
            placeholderTextColor="#7c8983"
            value={busca}
            onChangeText={setBusca}
            autoCorrect={false}
            style={estilos.busca}
          />
          {!!busca && <Pressable role="button" onPress={() => setBusca('')} style={estilos.limpar}><Text style={estilos.limparTexto}>Limpar busca</Text></Pressable>}

          {!!erro && <View role="alert" style={estilos.aviso}>
            <Text style={estilos.erro}>{erro}{alunos.length > 0 ? ' A lista anterior foi mantida.' : ''}</Text>
            <Pressable role="button" disabled={carregando} onPress={atualizar} style={estilos.tentar}><Text style={estilos.tentarTexto}>Tentar novamente</Text></Pressable>
          </View>}

          <FlatList
            data={visiveis}
            keyExtractor={(aluno) => aluno.id}
            style={estilos.lista}
            contentContainerStyle={estilos.itens}
            keyboardShouldPersistTaps="handled"
            renderItem={({ item, index }) => <View testID="aluno" style={estilos.aluno}>
              <View style={estilos.numero}><Text style={estilos.numeroTexto}>{index + 1}</Text></View>
              <View style={estilos.dados}>
                <Text style={estilos.nome}>{item.nome}</Text>
                <Text style={estilos.local}>{item.cidade} · {item.pais}</Text>
              </View>
            </View>}
            ListEmptyComponent={carregando ? <View style={estilos.vazio}><ActivityIndicator size="large" color="#24684d" /><Text style={estilos.vazioTexto}>Carregando alunos...</Text></View>
              : !erro ? <View style={estilos.vazio}><Text style={estilos.vazioTitulo}>Nenhum aluno encontrado.</Text><Text style={estilos.vazioTexto}>{busca.trim() ? 'Experimente outro nome ou cidade.' : 'Toque em Atualizar para buscar outra lista.'}</Text></View> : undefined}
          />
          <Text style={estilos.rodape}>Perfis fictícios da Random User · Pedro Henrique</Text>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const estilos = StyleSheet.create({
  tela: { flex: 1, backgroundColor: '#f2f6f1' },
  conteudo: { flex: 1, width: '100%', maxWidth: 640, alignSelf: 'center', padding: 24 },
  etiqueta: { color: '#597769', fontSize: 10, fontWeight: '700', letterSpacing: 1.5, marginTop: 16 },
  titulo: { color: '#183e2e', fontSize: 34, fontWeight: '700', marginTop: 10 },
  descricao: { color: '#718075', fontSize: 14, lineHeight: 21, marginTop: 7, marginBottom: 24 },
  ferramentas: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18, gap: 10 },
  total: { color: '#24684d', fontSize: 14, fontWeight: '600' },
  botao: { backgroundColor: '#24684d', borderRadius: 7, paddingHorizontal: 20, minHeight: 44, alignItems: 'center', justifyContent: 'center' },
  botaoTexto: { color: '#fff', fontSize: 13, fontWeight: '600' },
  desabilitado: { opacity: 0.6 },
  busca: { backgroundColor: '#fff', borderColor: '#d3dfd5', borderWidth: 1, borderRadius: 7, paddingHorizontal: 14, minHeight: 46, fontSize: 14, color: '#183e2e', marginBottom: 8 },
  limpar: { alignSelf: 'flex-start', paddingVertical: 12, paddingRight: 20 },
  limparTexto: { color: '#24684d', fontSize: 12 },
  lista: { flex: 1, marginTop: 8 },
  itens: { paddingBottom: 8 },
  aluno: { backgroundColor: '#fff', borderRadius: 8, padding: 16, flexDirection: 'row', alignItems: 'center', gap: 14, marginBottom: 10, borderWidth: 1, borderColor: '#e1e9df' },
  numero: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#e9f1e5', alignItems: 'center', justifyContent: 'center' },
  numeroTexto: { color: '#5d7a4d', fontWeight: '600', fontSize: 13 },
  dados: { flex: 1, minWidth: 0 },
  nome: { color: '#254335', fontWeight: '600', fontSize: 16, lineHeight: 22 },
  local: { color: '#7b897e', fontSize: 12, lineHeight: 19, marginTop: 4 },
  vazio: { paddingVertical: 40, alignItems: 'center', gap: 12 },
  vazioTitulo: { color: '#254335', fontWeight: '600', fontSize: 15, textAlign: 'center' },
  vazioTexto: { color: '#718075', fontSize: 13, textAlign: 'center' },
  aviso: { backgroundColor: '#fff1e6', borderRadius: 8, padding: 15, marginTop: 10 },
  erro: { color: '#945333', fontSize: 13, lineHeight: 21 },
  tentar: { alignSelf: 'flex-start', paddingVertical: 12, paddingRight: 14 },
  tentarTexto: { color: '#945333', fontWeight: '700', fontSize: 13 },
  rodape: { color: '#859184', fontSize: 10, textAlign: 'center', marginTop: 18, marginBottom: 8, lineHeight: 17 },
});
