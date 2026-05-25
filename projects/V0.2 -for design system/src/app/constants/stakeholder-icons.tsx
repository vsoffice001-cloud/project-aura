import {
  Users,
  UsersFour,
  UsersThree,
  UserCircle,
  UserFocus,
  IdentificationCard,
  Handshake,
  HandsClapping,
  Briefcase,
  UserList,
  AddressBook,
  Chats,
  ChatCentered,
  UserSound,
  Megaphone,
} from '@phosphor-icons/react';

/**
 * KP 2.0 Design System - Stakeholder/Target Audience Icons Collection
 * 
 * Collection of 15 generic Phosphor icons that represent "target audience/stakeholders" concepts.
 * These icons are interchangeable and can work with ANY stakeholder card content.
 * 
 * All icons convey: people, audiences, users, stakeholders, engagement, communication
 * 
 * Usage:
 * - Randomly assign to stakeholder/audience cards
 * - All use regular/outline weight
 * - Generic enough to work with any card title/content
 */

export const STAKEHOLDER_ICONS = [
  Users,              // Users group
  UsersFour,          // Four users
  UsersThree,         // Three users
  UserCircle,         // User in circle
  UserFocus,          // Focused user
  IdentificationCard, // User identification
  Handshake,          // Partnership/engagement
  HandsClapping,      // Appreciation/support
  Briefcase,          // Business stakeholders
  UserList,           // User directory
  AddressBook,        // Contact/audience
  Chats,              // Communication
  ChatCentered,       // Engagement
  UserSound,          // Audience voice
  Megaphone,          // Outreach/targeting
] as const;

/**
 * Get a random icon from the stakeholder icons collection
 */
export function getRandomStakeholderIcon() {
  const randomIndex = Math.floor(Math.random() * STAKEHOLDER_ICONS.length);
  return STAKEHOLDER_ICONS[randomIndex];
}

/**
 * Get an icon by index (deterministic assignment)
 * Useful for consistent icon assignment based on card position
 */
export function getStakeholderIconByIndex(index: number) {
  return STAKEHOLDER_ICONS[index % STAKEHOLDER_ICONS.length];
}
