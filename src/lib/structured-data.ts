import { achievements } from "@/content/achievements";
import { education } from "@/content/education";
import { experience, leadership } from "@/content/experience";
import { configuredSocials, siteConfig } from "@/lib/site-config";

/**
 * schema.org JSON-LD describing the site owner. Search engines use this to
 * connect the name "Galih Aji Pangestu" with this site and with the profiles
 * listed in `sameAs` (add LinkedIn etc. in site-config to strengthen it).
 */
export function personJsonLd() {
  const url = siteConfig.url;
  const personId = `${url}/#person`;
  const current = experience.filter((e) => !e.end);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: siteConfig.name,
        givenName: "Galih Aji",
        familyName: "Pangestu",
        alternateName: siteConfig.alternateNames,
        url,
        image: `${url}/opengraph-image`,
        jobTitle: siteConfig.jobTitle,
        description: siteConfig.positioning,
        knowsAbout: siteConfig.knowsAbout,
        nationality: { "@type": "Country", name: "Indonesia" },
        homeLocation: { "@type": "Place", name: siteConfig.location },
        ...(siteConfig.email ? { email: `mailto:${siteConfig.email}` } : {}),
        sameAs: configuredSocials().map((s) => s.href),
        alumniOf: education.map((e) => ({ "@type": "EducationalOrganization", name: e.institution })),
        worksFor: current.map((e) => ({ "@type": "Organization", name: e.organisation })),
        memberOf: leadership
          .filter((l) => l.kind === "leadership" && !l.end)
          .map((l) => ({ "@type": "OrganizationRole", roleName: l.position, memberOf: { "@type": "Organization", name: l.organisation } })),
        award: achievements.map((a) => `${a.result} — ${a.title}${a.date ? ` (${a.date})` : ""}`),
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        url,
        name: `${siteConfig.name} — ${siteConfig.title}`,
        alternateName: [siteConfig.title, "GAPZ. Portfolio"],
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${url}/#profilepage`,
        url,
        name: siteConfig.seoTitle,
        description: siteConfig.seoDescription,
        isPartOf: { "@id": `${url}/#website` },
        about: { "@id": personId },
        mainEntity: { "@id": personId },
        inLanguage: "en",
      },
    ],
  };
}
