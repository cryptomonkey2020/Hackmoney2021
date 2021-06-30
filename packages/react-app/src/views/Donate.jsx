import React, { useState } from "react";
import DonateListItem from '../components/DonateListItem'
import { CAUSE_FILTERS } from '../constants'
import "./Donate.scss"

const STATUS_FILTERS = ['Ongoing', 'Closed']

const Donate = ({ organisations = dummyOrganisations }) => {

  const [activeFilters, setActiveFilters] = useState(["Ongoing"])

  const removeFromActiveFilters = (name) => {
    setActiveFilters(activeFilters.filter(a => a === name))
  }
  const addToActiveFilters = (name) => {
    let _activeFilters = [...activeFilters]
    _activeFilters.push(name)
    setActiveFilters(_activeFilters)
  }

  return (
    <div className="donate-page">
      {/* 
        Header 
      */}
      <div className="donate-page-header">
        <div className="title">
          <div className="quote">“Alone we can do so little, together we can do so much”</div>
          <div className="author">- Helen Keller</div></div>
        <div className="background"></div>
      </div>

      {/* 
        Body 
      */}
      <div className="donate-page-body container">
        <div className="filters-column">

          <div className="header">
            <span>Filter by</span>
            <a className="clear-all" onClick={() => setActiveFilters([])}>Clear all</a>
          </div>
          
          {/* 
            Causes Filters
          */}
          <section>
            <div className="section-title">Causes</div>

            {CAUSE_FILTERS && CAUSE_FILTERS.map((cause, i) => (
              <div className="checkbox filter-item" key={cause.name || i}>
                  <input
                      type="checkbox"
                      className="checkbox-input"
                      id={`filter-${cause.name || i}`}
                      checked={activeFilters.find(f => f === cause.name)}
                      onChange={(e) => e.target.checked 
                        ? addToActiveFilters(e.target.id) 
                        : removeFromActiveFilters(e.target.id)} />
                  <label
                      className="checkbox-label"
                      htmlFor={`filter-${cause.name || i}`}>
                      {cause.name} <span className="icon">{cause.icon}</span>
                  </label>
              </div>
            ))}
          </section>
          

          {/* 
            Status Filters
          */}
          <section>
            <div className="section-title">Status</div>

            {STATUS_FILTERS.map((status, i) => (
              <div className="checkbox filter-item" key={status || i}>
                  <input
                      type="checkbox"
                      className="checkbox-input"
                      id={`filter-${status || i}`}
                      checked={activeFilters.find(f => f === status)}
                      onChange={(e) => e.target.checked 
                        ? addToActiveFilters(e.target.id) 
                        : removeFromActiveFilters(e.target.id)} />
                  <label
                      className="checkbox-label"
                      htmlFor={`filter-${status || i}`}>
                      {status}
                  </label>
              </div>
            ))}
        </section>

        </div>

        <div className="campaign-list-column">

          <input type="text" className="search-campaign-list search-icon" placeholder="Search by campaign name" />

          {organisations && organisations.map((org, i) => (
            <DonateListItem org={org} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

const dummyOrganisations = [
  {
    id: 1,
    name: "Feeding Pets of the Homeless",
    description: "Feeding Pets of the Homeless® believes in the healing power of companion pets and of the human/animal bond which is very important in the lives of many homeless. They find solace, protection and companionship through their pets. They care for their pets on limited resources so they themselves have less. Our task, nationwide, is to feed and provide basic emergency veterinary care to their pets and thus relieve the anguish and anxiety of the homeless who cannot provide for their pets. Our actions will include the following: 1. Promote to veterinarians and pet related businesses the importance of joining the program as a collection site 2. Campaign to food distributing organizations the importance of distributing pet food to the less fortunate 3. Speak out on the issue of pets of homeless and the disadvantaged 4. Provide funding to licensed veterinarians and other nonprofit organizations that meet our objective to administer veterinary care to pets of the homeless 5. Provide pet sleeping crates to homeless shelters",
    url: "http:/​/​www.petsofthehomeless.org/​",
    logo: "https://i.imgur.com/ASVfYJI.jpg",
    location: "Nevada, United States",
    campaigns: [
      {
        id: 1,
        address: "0xC7C73D5D7E3Ad734808B0EB33c33e455c8F66Ae4",
        name: "Emergency Veterinary Care for Pets of the Homeless",
        category: ['Animal Welfare'],
        description: "Your donation will help a pet that belongs to a homeless person in the U.S., and Canada. We provide emergency veterinary care and pet food to the hundreds of thousands of pets that are companions to the homeless. Each year, 3.5 million experience homelessness in America according to the National Coalition for the Homeless. We estimate that 10-25% of homeless have pets, many are service animals The need for veterinary care is at an all-time high when a pet is injured or ill.",
        image: "https://i.imgur.com/7Fd5NVI.jpg",
        goal: 100000,
        raised: 88368
      }
    ]
  },
  {
    id: 2,
    name: "International Center for Advocates Against Discrimination (ICAAD)",
    description: "ICAAD works at the intersection of legal innovation and human-centered design to create evidence-based programs with organizations and communities to combat structural discrimination. By leveraging multidisciplinary teams and taking an integrated approach, we are able to improve resilience, safety, and equity across systems.",
    url: "http:/​/​www.icaad.ngo",
    logo: "https://i.imgur.com/Y5pMFki.png",
    location: "New York, United States",
    campaigns: [
      {
        id: 2,
        address: "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506",
        name: "Justice for Pacific & Caribbean Women & Girls",
        category: ['Justice & Human Rights'],
        description: "When women and children in Pacific Island and Caribbean region access the formal court system in gender-based violence cases, they face numerous barriers that block their pathway to justice. ICAAD's evidence (through review of 1000s of cases) shows the driving force behind this problem is gender discrimination, which includes: stereotypes, rape myths, and specific customary practices. By engaging civil society and the judiciary we use the insights from data to inform our interventions.",
        image: "https://i.imgur.com/eFXKEYs.jpg",
        goal: 30000,
        raised: 8955
      }
    ]
  },
  {
    id: 3,
    name: "Pomoc deci",
    description: "Too many children and youth suffer the effects of poverty and violence. Pomoc deci (Children and Youth Support Organisation) creates an environment of hope and respect for children and youth, where they have opportunities to achieve their full potential, and provides children, youth, parents and communities with practical tools for positive change. <b>Awards and Recognition<b> ERSTE award for social innovations as one of the best social inclusion programmes in southeast Europe in 2009. Management Quality Certificate based on ISO 9001/2008 requirements.",
    logo: "https://i.imgur.com/BIAjA8Y.jpg",
    url: "http:/​/​www.pomocdeci.org",
    location: "Belgrade, Serbia",
    campaigns: [
      {
        id: 3,
        address: "0xc20cf81dff14ce8c9b454e6cd4b2145d81535849",
        name: "Give refugee children in Serbia hope for education",
        category: ['Education'],
        description: "After more than 20 years of wars in the Balkans, there are still about 1000 children in 30 collective centers in Serbia. Many of these children have to drop out of school to help parents earn money for basic necessities like food. Targeted support will provide for school lunch, winter clothes, textbooks and tutoring for 750 of these children to stay and complete elementary and higher education. This will help them get qualification, find regular jobs and help their families rebuild their lives.",
        image: "https://i.imgur.com/068fFfk.jpg",
        goal: 55000,
        raised: 2870
      }
    ]
  },
  {
    id: 4,
    name: "Wildlife Alliance",
    description: "The wildlife trade is a multi-billion dollar industry that threatens endangered species' survival and human health as zoonotic diseases such as COVID-19 emerge. Cambodia is both a wildlife source and transit country, and illegal trafficking was rampant in 2001 when the Wildlife Rapid Rescue Team (WRRT) was established to crack down on the trade. To date, WRRT has rescued over 69,000 live animals, apprehended over 7,700 traders, and confiscated large quantities of animal parts and contraband.",
    logo: "https://i.imgur.com/lCdyivk.jpg",
    url: "https:/​/​www.wildlifealliance.org/​",
    location: "New York, United States",
    campaigns: [
      {
        id: 4,
        address: "0x1b02da8cb0d097eb8d57a175b88c7d8b47997506",
        name: "Help Stop Illegal Wildlife Trafficking",
        category: ['Wildlife Conservation'],
        description: "The wildlife trade is a multi-billion dollar industry that threatens endangered species' survival and human health as zoonotic diseases such as COVID-19 emerge. Cambodia is both a wildlife source and transit country, and illegal trafficking was rampant in 2001 when the Wildlife Rapid Rescue Team (WRRT) was established to crack down on the trade. To date, WRRT has rescued over 69,000 live animals, apprehended over 7,700 traders, and confiscated large quantities of animal parts and contraband.",
        image: "https://i.imgur.com/XxWLj09.jpg",
        goal: 100000,
        raised: 12510
      }
    ]
  },
]

export default Donate