import { Container,Button } from "@mui/material";
import homeimage from './metallic-hero-image.webp'
export default function Home() {
    return (
      <Container>
        <div sx={{ display: 'flex' }}>
          <div>
            {/* Assuming you want to render an image */}
            <img src={homeimage} alt="Backup and Recovery" />
          </div>
          <div sx={{ marginLeft: 'auto', padding: '16px' }}>
            <Button>udhhdi</Button>
          </div>
        </div>
      </Container>
    );
  }
  