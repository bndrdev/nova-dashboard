import React, { useState } from "react";
import {
  LayoutDashboard,
  Server,
  Shield,
  MessageSquare,
  ScrollText,
  ChartNoAxesCombined,
  Ticket,
  Settings,
  Search,
  ChevronLeft,
  Menu,
  Power,
  Users,
  Hash,
  Activity,
} from "lucide-react";
import "./style.css";

const nav = [
  ["الرئيسية", LayoutDashboard],
  ["السيرفرات", Server],
  ["الموديريشن", Shield],
  ["الترحيب", MessageSquare],
  ["AutoMod", Shield],
  ["Logs", ScrollText],
  ["Levels", ChartNoAxesCombined],
  ["Tickets", Ticket],
  ["الإعدادات", Settings],
];

function App() {
  const [page, setPage] = useState("الرئيسية");
  const [open, setOpen] = useState(true);
  const [enabled, setEnabled] = useState(true);

  return (
    <div className="app" dir="rtl">
      <aside className={open ? "side" : "side closed"}>
        <div className="brand">
          <div className="logo">N</div>

          {open && (
            <div>
              <b>Nova</b>
              <span>Dashboard</span>
            </div>
          )}
        </div>

        <button
          className="collapse"
          onClick={() => setOpen(!open)}
        >
          <ChevronLeft size={18} />
        </button>

        <div className="nav">
          {nav.map(([name, Icon]) => (
            <button
              key={name}
              className={page === name ? "active" : ""}
              onClick={() => setPage(name)}
            >
              <Icon size={19} />
              {open && name}
            </button>
          ))}
        </div>

        <div className="bot">
          <div className="status">
            <span />
            البوت متصل
          </div>

          {open && (
            <small>Nova Bot • v2.4.0</small>
          )}
        </div>
      </aside>

      <main>
        <header>
          <button
            className="mobile"
            onClick={() => setOpen(!open)}
          >
            <Menu />
          </button>

          <div>
            <h1>{page}</h1>
            <p>
              إدارة Nova Bot بسهولة من مكان واحد.
            </p>
          </div>

          <div className="head-actions">
            <div className="search">
              <Search size={17} />
              <input placeholder="بحث..." />
            </div>

            <div className="avatar">H</div>
          </div>
        </header>

        <section className="content">
          {page === "الرئيسية" ? (
            <Home
              enabled={enabled}
              setEnabled={setEnabled}
            />
          ) : (
            <Panel
              page={page}
              enabled={enabled}
              setEnabled={setEnabled}
            />
          )}
        </section>
      </main>
    </div>
  );
}

function Home({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  const stats = [
    ["الأعضاء", "2,847", Users],
    ["القنوات", "64", Hash],
    ["البوت", "Online", Activity],
    ["الحالة", "ممتازة", Shield],
  ];

  return (
    <>
      <div className="server-card">
        <div className="server-icon">A</div>

        <div>
          <b>Astral SMP</b>
          <p>لوحة تحكم السيرفر</p>
        </div>

        <button className="manage">
          متصل
          <Power size={15} />
        </button>
      </div>

      <div className="grid">
        {stats.map(([title, value, Icon]) => (
          <div className="stat" key={title as string}>
            <div className="stat-icon">
              {React.createElement(Icon as any, {
                size: 19,
              })}
            </div>

            <span>{title}</span>
            <strong>{value}</strong>
            <small>+12% هذا الأسبوع</small>
          </div>
        ))}
      </div>

      <div className="cols">
        <div className="card">
          <div className="card-head">
            <div>
              <b>نشاط السيرفر</b>
              <p>آخر 7 أيام</p>
            </div>

            <select>
              <option>آخر 7 أيام</option>
            </select>
          </div>

          <div className="chart">
            <div className="bars">
              {[45, 68, 52, 84, 63, 91, 74].map(
                (height, index) => (
                  <div key={index}>
                    <span
                      style={{
                        height: `${height}%`,
                      }}
                    />

                    <small>
                      {[
                        "س",
                        "ح",
                        "ن",
                        "ث",
                        "ر",
                        "خ",
                        "ج",
                      ][index]}
                    </small>
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-head">
            <b>إعدادات سريعة</b>
          </div>

          {[
            [
              "الترحيب",
              "إرسال رسالة للأعضاء الجدد",
            ],
            [
              "AutoMod",
              "حماية تلقائية من المخالفات",
            ],
            [
              "Logs",
              "تسجيل أحداث السيرفر",
            ],
          ].map(([title, description]) => (
            <div className="row" key={title}>
              <div>
                <b>{title}</b>
                <small>{description}</small>
              </div>

              <button
                className={
                  enabled
                    ? "toggle on"
                    : "toggle"
                }
                onClick={() =>
                  setEnabled(!enabled)
                }
              >
                <i />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function Panel({
  page,
  enabled,
  setEnabled,
}: {
  page: string;
  enabled: boolean;
  setEnabled: (value: boolean) => void;
}) {
  const settings = [
    "تفعيل النظام",
    "القناة الافتراضية",
    "رسالة الإشعارات",
    "صلاحيات الإدارة",
    "حفظ تلقائي",
  ];

  return (
    <div className="card big">
      <div className="panel-title">
        <div>
          <h2>{page}</h2>
          <p>
            تحكم كامل في إعدادات {page}.
          </p>
        </div>

        <button
          className={
            enabled
              ? "toggle on"
              : "toggle"
          }
          onClick={() =>
            setEnabled(!enabled)
          }
        >
          <i />
        </button>
      </div>

      {settings.map((setting, index) => (
        <div className="setting" key={setting}>
          <div>
            <b>{setting}</b>

            <small>
              {index === 0
                ? "تفعيل أو تعطيل هذه الميزة"
                : index === 1
                ? "اختر القناة التي يستخدمها البوت"
                : "إعدادات قابلة للتخصيص حسب احتياج سيرفرك"}
            </small>
          </div>

          {index === 0 ? (
            <button
              className={
                enabled
                  ? "toggle on"
                  : "toggle"
              }
              onClick={() =>
                setEnabled(!enabled)
              }
            >
              <i />
            </button>
          ) : (
            <button className="select">
              اختيار
              <ChevronLeft size={15} />
            </button>
          )}
        </div>
      ))}

      <button className="save">
        حفظ التغييرات
      </button>
    </div>
  );
}

export default App;
