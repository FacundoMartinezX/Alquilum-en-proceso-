import { SpaceList } from '../components/SpaceList';
import '../styles/MainContent.css'

export function MainContent() {
    return (
        <>
    <section className="container-filters">
        <div className="filters">
          <p>Aquí van los filtros</p>
        </div>
      </section>

      <main className="main-content">
        <SpaceList/>
      </main>
        </>

    );
  }