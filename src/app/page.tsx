import Image from "next/image";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import Stack from "@mui/joy/Stack";
import Divider from "@mui/joy/Divider";
import InitDBButton from "./components/InitDBButton";
import { Card } from "@mui/joy";
import GetDBDataButton from "./components/GetDBDataButton";

export default function Home() {
  const users: string[] = ["kyle", "abbot", "christie", "emma"];
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-start sm:items-start">
        <Typography level="h1">Actions</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(80px, 1fr))",
              gap: 1,
            }}
          >
            <InitDBButton />
            <Button size="md" variant={"outlined"} color="neutral">
              Populate all
            </Button>
            <Button size="md" variant={"outlined"} color="neutral">
              Clear all
            </Button>
          </Box>
        </Box>

        <Typography level="h1">Databases</Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(80px, 1fr))",
              gap: 1,
            }}
          >
            <Card sx={{ backgroundColor: "#0a0a0a" }} variant="outlined">
              <Typography level="title-lg">Europe</Typography>
              <Stack spacing={1}>
                <GetDBDataButton table="Europe">All data</GetDBDataButton>
                <Button size="md" variant={"outlined"} color="neutral">
                  all data
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  users
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  scores
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  matches
                </Button>
              </Stack>
            </Card>
            <Card sx={{ backgroundColor: "#0a0a0a" }} variant="outlined">
              <Typography level="title-lg"> North America</Typography>
              <Stack spacing={1}>
                <Button size="md" variant={"outlined"} color="neutral">
                  all data
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  users
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  scores
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  matches
                </Button>
              </Stack>
            </Card>
            <Card sx={{ backgroundColor: "#0a0a0a" }} variant="outlined">
              <Typography level="title-lg">Asia</Typography>
              <Stack spacing={1}>
                <Button size="md" variant={"outlined"} color="neutral">
                  all data
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  users
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  scores
                </Button>
                <Button size="md" variant={"outlined"} color="neutral">
                  matches
                </Button>
              </Stack>
            </Card>
          </Box>
        </Box>

        <Typography level="h1">Data</Typography>
        <Stack spacing={2}>
          {users?.map((user, index) => (
            <Stack key={index}>
              {user}
              <Divider />
            </Stack>
          ))}
        </Stack>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
