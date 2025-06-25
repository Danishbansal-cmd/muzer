import { AppBar } from "../components/Appbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* learn context api */}
      <AppBar showThemeSwitch={false}/>
      <main></main>
    </div>
  );
}
