import React from 'react'
import { Link } from "react-router-dom";
import { HeartFilled } from '@ant-design/icons'
import "./DonateListItem.scss"

const DonateListItem = ({
    org
}) => {

    const { id:organisationId, name:organisationName } = org || {}
    const campaign = org && org.campaigns && org.campaigns[0]
    const { id, name, category: categories, description, image, goal, raised } = campaign || {}
    const categoryConcatenated = categories && categories.join(', ')
    const percentage = (goal && raised) ? (raised/goal*100) : 0

    return (
        <div className="donate-list-item">
            <div className="cover-image" alt={name} style={{ backgroundImage: image ? `url(${image})` : `` }}></div>
            <div className="details">
                <div className="category">{categoryConcatenated}</div>
                <div className="name">
                    <Link to={`/campaigns/${id}`}>{name}</Link>
                </div>
                <div className="organisation">
                    by <Link to={`/organisations/${organisationId}`}>{organisationName}</Link>
                </div>
                <div className="description">
                    <p>
                        {description ? description.slice(0, 150) : description}
                        {"... "}
                        <Link to={`/campaign/${id}`} className="read-or-hide">
                            read more
                        </Link>
                    </p>
                </div>
                <div className="goal-and-donate-row">
                    <div>
                        <div className="progress-values">
                            <div className="raised">{raised} USDC</div>
                            <div className="goal">raised of {goal} USDC goal</div>
                        </div>
                        <div className="progress-bar-container">
                            <div className="progress-bar" style={{ width: `${percentage}%`}}></div>
                        </div>
                    </div>
                    <Link to={`/campaigns/${id}`} className="btn btn-primary">Give <HeartFilled /></Link>
                </div>
            </div>
        </div>
    )
}

export default DonateListItem