import { Routes, Route } from 'react-router-dom';
import { PostsPage, PostPage } from '@/pages';
import { Container } from '@/shared/ui/Container';
import { ScrollProvider } from '@/app/providers/ScrollProvider';
import styles from './App.module.css';

function App() {
  return (
    <div className={styles.app}>
      <Container>
        <ScrollProvider>
          <Routes>
            <Route path="/" element={<PostsPage />} />
            <Route path="/post/:id" element={<PostPage />} />
          </Routes>
        </ScrollProvider>
      </Container>
    </div>
  );
}

export default App;